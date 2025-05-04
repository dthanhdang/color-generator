import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"

type EmailFormData = {
  email: string
}

type UseRequestOTPOutput<FORM_DATA extends EmailFormData> = {
  formData: FORM_DATA | undefined
  handleResendOTP: () => undefined
  handleSubmit: (formData: FORM_DATA) => undefined
}

type UseRequestOTPProps = {
  requestOTP: (props: EmailFormData) => Promise<void>
}

export function useRequestOTP<FORM_DATA extends EmailFormData>({
  requestOTP,
}: UseRequestOTPProps): UseRequestOTPOutput<FORM_DATA> {
  const [formData, setFormData] = useState<FORM_DATA>()
  const requestOTPMutation = useMutation({
    mutationFn: ({ email }: FORM_DATA) => requestOTP({ email }),
  })

  return useMemo((): UseRequestOTPOutput<FORM_DATA> => {
    // We use a mutation so errors are displayed as notifications
    function handleResendOTP(): undefined {
      if (formData) requestOTPMutation.mutate(formData)
    }

    const handleSubmit = (formData: FORM_DATA): undefined => {
      requestOTPMutation.mutate(formData, {
        onSuccess: () => {
          setFormData(formData)
        },
      })
    }

    return { formData, handleResendOTP, handleSubmit }
  }, [formData, requestOTPMutation])
}
