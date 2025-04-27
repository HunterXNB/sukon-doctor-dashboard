import { z } from "zod";
import validator from "validator";
export const RegisterSchema = z.object({
  first_name: z
    .string({
      required_error: "firstNameRequiredError",
    })
    .min(3, "firstNameMinLengthError"),
  last_name: z
    .string({
      required_error: "secondNameRequiredError",
    })
    .min(3, "secondNameMinLengthError"),
  title: z
    .string({
      required_error: "titleRequiredError",
    })
    .min(3, "titleMinLengthError"),
  email: z
    .string({
      required_error: "emailRequiredError",
    })
    .email("emailInvalidError"),
  mobile: z
    .string({
      required_error: "mobileRequiredError",
    })
    .refine(validator.isMobilePhone, "mobileInvalidError"),
  date_of_birth: z
    .string({
      required_error: "dateOfBirthRequiredError",
    })
    .date("dateOfBirthInvalidError"),
  gender: z
    .string({
      required_error: "genderRequiredError",
    })
    .trim()
    .refine(
      (val) => ["male", "female"].includes(val),
      "genderInvalidValueError"
    ),
  nationality: z
    .string({
      required_error: "nationalityRequiredError",
    })
    .min(2, "nationalityRequiredError"),
  country_of_residence: z
    .string({
      required_error: "countryOfResidenceRequiredError",
    })
    .min(2, "countryOfResidenceRequiredError"),
  fluent_language: z
    .string({
      required_error: "fluentLanguageRequiredError",
    })
    .trim()
    .refine(
      (val) => ["english", "spanish", "arabic", "french"].includes(val),
      "fluentLanguageInvalidError"
    ),
  highest_degree: z
    .string({
      required_error: "highestDegreeRequiredError",
    })
    .trim()
    .refine(
      (val) => ["bachelor", "master", "doctorate"].includes(val),
      "highestDegreeInvalidError"
    ),
  university: z
    .string({
      required_error: "universityRequiredError",
    })
    .min(3, "universityRequiredError"),
  graduation_year: z
    .string({
      required_error: "graduationYearRequiredError",
    })
    .date("graduationYearInvalidError"),
  role_id: z.enum(["2", "3", "4"], {
    required_error: "classificationRequiredError",
    invalid_type_error: "classificationInvalidTypeError",
    message: "classificationInvalidTypeError",
  }),
  specifications: z
    .array(
      z.object({
        value: z.coerce.number({
          required_error: "specificationRequiredError",
        }),
        label: z.string({
          required_error: "specificationRequiredError",
        }),
      }),
      {
        invalid_type_error: "specificationInvalidError",
        required_error: "specificationInvalidError",
        message: "specificationInvalidError",
      }
    )
    .min(1, "specificationInvalidError"),
  // z
  //   .string({
  //     required_error: "specificationRequiredError",
  //   })
  //   .min(3, "specificationInvalidError"),
  number_of_years_of_experience: z.coerce
    .number({ required_error: "numberOfYearsOfExperienceRequiredError" })
    .min(1, "numberOfYearsOfExperienceInvalidError")
    .transform((val) => val.toString()),
  licensing_number: z
    .string({
      required_error: "licensingNumberRequiredError",
    })
    .min(5, "licensingNumberInvalidError"),
  licensing_area: z
    .string({
      required_error: "licensingAreaRequiredError",
    })
    .min(3, "licensingAreaInvalidError"),
  work_on_clinic: z
    .string({
      required_error: "workOnClinicRequiredError",
    })
    .trim()
    .refine((val) => ["0", "1"].includes(val), "workOnClinicInvalidError"),
  cv: z
    .array(
      z.instanceof(File, {
        message: "cvInvalidTypeError",
      })
    )
    .min(1, "cvInvalidError")
    .max(1, "cvInvalidError"),
  certificates: z.array(z.instanceof(File)).min(1, "certificatesInvalidError"),
  has_more_than_one_qualification: z
    .string({
      required_error: "hasMoreThanOneQualificationRequiredError",
    })
    .trim()
    .refine(
      (val) => ["0", "1"].includes(val),
      "hasMoreThanOneQualificationInvalidError"
    ),
});
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export const step1RegisterSchema = RegisterSchema.pick({
  country_of_residence: true,
  first_name: true,
  last_name: true,
  mobile: true,
  email: true,
  date_of_birth: true,
  fluent_language: true,
  nationality: true,
  gender: true,
  title: true,
});
export type Step1RegisterFormValues = z.infer<typeof step1RegisterSchema>;
export const step2RegisterSchema = RegisterSchema.pick({
  graduation_year: true,
  highest_degree: true,
  university: true,
});
export type Step2RegisterFormValues = z.infer<typeof step2RegisterSchema>;
export const step3RegisterSchema = RegisterSchema.pick({
  role_id: true,
  specifications: true,
  number_of_years_of_experience: true,
  licensing_area: true,
  licensing_number: true,
  work_on_clinic: true,
});
export type Step3RegisterFormValues = z.infer<typeof step3RegisterSchema>;
export const step4RegisterSchema = RegisterSchema.pick({
  cv: true,
  certificates: true,
  has_more_than_one_qualification: true,
});
export type Step4RegisterFormValues = z.infer<typeof step4RegisterSchema>;
