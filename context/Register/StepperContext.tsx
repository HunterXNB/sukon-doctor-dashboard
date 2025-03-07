import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "client-only";
import { useFormContext } from "react-hook-form";
import { RegisterFormValues } from "@/schemas/register";
import { stepToFieldMap } from "@/components/register/Form";

const StepperContext = createContext<{
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (val: number | ((prevState: number) => number)) => void;
}>({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
  setStep: () => {},
});
export default function StepperContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [step, setStep] = useState(() => {
    const persistedStep = parseInt(localStorage.getItem("form_step") ?? "1");
    if (Number.isNaN(persistedStep)) return 1;
    if (persistedStep === 5) return 4;
    if (persistedStep > 5) return 1;
    return persistedStep;
  });
  const methods = useFormContext<RegisterFormValues>();
  const nextStep = useCallback(async () => {
    const isValid = await methods.trigger(stepToFieldMap[step]);
    if (isValid) {
      setStep((prev) => (prev === 5 ? 5 : ++prev));
    }
  }, [methods, step, setStep]);

  const prevStep = useCallback(() => {
    setStep((prev) => (prev === 1 ? 1 : --prev));
  }, [setStep]);
  useEffect(() => {
    localStorage.setItem("form_step", `${step}`);
  }, [step]);
  return (
    <StepperContext.Provider value={{ step, setStep, nextStep, prevStep }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepper() {
  return useContext(StepperContext);
}
