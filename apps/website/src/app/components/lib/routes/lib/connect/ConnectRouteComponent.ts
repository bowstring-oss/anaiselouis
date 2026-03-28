/*
 * Copyright © 2026 Anaïse Louis. All rights reserved.
 */

import { ChangeDetectionStrategy, Component, effect, inject, signal, type WritableSignal }                                                                                                                                                                               from "@angular/core";
import { Analytics, logEvent }                                                                                                                                                                                                                                           from "@angular/fire/analytics";
import { addDoc, collection, type CollectionReference, Firestore, FirestoreError, serverTimestamp }                                                                                                                                                                      from "@angular/fire/firestore";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, type ValidationErrors, Validators }                                                                                                                                                               from "@angular/forms";
import { AuthenticationService, EllipsesService, ErrorsService, getFirestoreErrorMessage }                                                                                                                                                                               from "@bowstring/core";
import { AsideComponent, BoxComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, OptionComponent, PhoneNumberFieldInputComponent, PickerInputComponent, SectionComponent, SymbolComponent, TextFieldInputComponent } from "@bowstring/surface";
import { type CountryCode, getCountries, getCountryCallingCode, isPossiblePhoneNumber, parsePhoneNumberWithError, type PhoneNumber }                                                                                                                                     from "libphonenumber-js";
import { RouteComponent }                                                                                                                                                                                                                                                from "../../../../";
import { type MessageDocument }                                                                                                                                                                                                                                          from "../../../../../interfaces";
import { MessageService }                                                                                                                                                                                                                                                from "../../../../../services";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      AsideComponent,
      BoxComponent,
      ButtonComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      OptionComponent,
      PhoneNumberFieldInputComponent,
      PickerInputComponent,
      ReactiveFormsModule,
      SectionComponent,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    styleUrl:        "ConnectRouteComponent.sass",
    templateUrl:     "ConnectRouteComponent.html",

    standalone: true,
  },
)
export class ConnectRouteComponent
  extends RouteComponent {

  constructor() {
    super();

    effect(
      (): void => {
        const messageDocument: MessageDocument | undefined = this.messageService.messageDocument$();

        if (messageDocument) {
          this.messageFormGroup.reset(
            ((
              {
                email,
                message,
                name,
                phone,
              }: MessageDocument,
            ): typeof this.messageFormGroup.value => ({
              email,
              message,
              name,
              ...(phone ? {
                phone: ((
                  {
                    countryCallingCode,
                    nationalNumber,
                  }: PhoneNumber,
                ): typeof this.messageFormGroup.controls.phone.value => ({
                  countryCallingCode,
                  nationalNumber,
                }))(parsePhoneNumberWithError(phone)),
              } : {}),
            }))(messageDocument),
          );

          this.messageFormGroup.disable();
        }
      },
    );
  }

  private readonly analytics: Analytics         = inject<Analytics>(Analytics);
  private readonly errorsService: ErrorsService = inject<ErrorsService>(ErrorsService);
  private readonly firestore: Firestore         = inject<Firestore>(Firestore);

  protected readonly authenticationService: AuthenticationService                                                                                                                                                                                         = inject<AuthenticationService>(AuthenticationService);
  protected readonly countryCallingCodes: Array<string>                                                                                                                                                                                                   = [ ...new Set<string>(getCountries().map<string>((countryCode: CountryCode): string => getCountryCallingCode(countryCode))) ].sort(
    (
      countryCallingCodeA: string,
      countryCallingCodeB: string,
    ): number => parseInt(countryCallingCodeA) > parseInt(countryCallingCodeB) ? 1 : - 1,
  );
  protected readonly ellipsesService: EllipsesService                                                                                                                                                                                                     = inject<EllipsesService>(EllipsesService);
  protected readonly messageFormGroup: FormGroup<{ "email": FormControl<string>, "message": FormControl<string>, "name": FormControl<string>, "phone": FormGroup<{ "countryCallingCode": FormControl<string>, "nationalNumber": FormControl<string> }> }> = new FormGroup<{ "email": FormControl<string>, "message": FormControl<string>, "name": FormControl<string>, "phone": FormGroup<{ "countryCallingCode": FormControl<string>, "nationalNumber": FormControl<string> }> }>(
    {
      email:   new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [ Validators.email ],
        },
      ),
      message: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [ Validators.required ],
        },
      ),
      name:    new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [ Validators.required ],
        },
      ),
      phone:   new FormGroup<{ "countryCallingCode": FormControl<string>, "nationalNumber": FormControl<string> }>(
        {
          countryCallingCode: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [ ({ value }: AbstractControl<string, string>): ValidationErrors => value && !this.countryCallingCodes.includes(value) ? { fromOptions: true } : {} ],
            },
          ),
          nationalNumber:     new FormControl<string>(
            "",
            { nonNullable: true },
          ),
        },
        {
          validators: [
            (phoneFormGroup: AbstractControl): ValidationErrors => {
              if (phoneFormGroup instanceof FormGroup && "countryCallingCode" in phoneFormGroup.controls && "nationalNumber" in phoneFormGroup.controls)
                return (phoneFormGroup.controls["countryCallingCode"].value || phoneFormGroup.controls["nationalNumber"].value) && ((phoneFormGroup.controls["countryCallingCode"].value && !phoneFormGroup.controls["nationalNumber"].value) || (!phoneFormGroup.controls["countryCallingCode"].value && phoneFormGroup.controls["nationalNumber"].value) || !isPossiblePhoneNumber(`+${ phoneFormGroup.controls["countryCallingCode"].value }${ phoneFormGroup.controls["nationalNumber"].value }`)) ? { possiblePhoneNumber: true } : {};

              return {};
            },
          ],
        },
      ),
    },
    {
      validators: [
        (messageFormGroup: AbstractControl): ValidationErrors => {
          if (messageFormGroup instanceof FormGroup && "email" in messageFormGroup.controls && "phone" in messageFormGroup.controls && messageFormGroup.controls["phone"] instanceof FormGroup && "countryCallingCode" in messageFormGroup.controls["phone"].controls && "nationalNumber" in messageFormGroup.controls["phone"].controls)
            return !messageFormGroup.controls["email"].value && !messageFormGroup.controls["phone"].controls["countryCallingCode"].value && !messageFormGroup.controls["phone"].controls["nationalNumber"].value ? { required: true } : {};

          return {};
        },
      ],
    },
  );
  protected readonly messagesFormWorking$: WritableSignal<boolean>                                                                                                                                                                                        = signal<boolean>(false);
  protected readonly messageService: MessageService                                                                                                                                                                                                       = inject<MessageService>(MessageService);

  protected logClickMailEvent(): void {
    logEvent<"click_mail">(
      this.analytics,
      "click_mail",
    );
  };

  protected async messageFormSubmit(): Promise<void> {
    const userId: string | undefined = this.authenticationService.user$()?.uid;

    if ((this.messageFormGroup.value.email || (this.messageFormGroup.value.phone?.countryCallingCode && this.messageFormGroup.value.phone.nationalNumber)) && this.messageFormGroup.value.message && this.messageFormGroup.value.name && userId) {
      this.messagesFormWorking$.set(true);

      return addDoc<MessageDocument, MessageDocument>(
        collection(
          this.firestore,
          "messages",
        ) as CollectionReference<MessageDocument, MessageDocument>,
        {
          created: serverTimestamp(),
          ...(this.messageFormGroup.value.email ? { email: this.messageFormGroup.value.email } : {}),
          message: this.messageFormGroup.value.message,
          name:    this.messageFormGroup.value.name,
          ...(this.messageFormGroup.value.phone?.countryCallingCode && this.messageFormGroup.value.phone.nationalNumber ? { phone: `+${ this.messageFormGroup.controls.phone.controls.countryCallingCode.value }${ this.messageFormGroup.controls.phone.controls.nationalNumber.value }` } : {}),
          userId,
        },
      ).then<void, never>(
        (): void => void (0),
        (firestoreError: FirestoreError): never => {
          this.errorsService.createError(getFirestoreErrorMessage(firestoreError));

          throw firestoreError;
        },
      ).finally((): void => this.messagesFormWorking$.set(false));
    }
  };

}
