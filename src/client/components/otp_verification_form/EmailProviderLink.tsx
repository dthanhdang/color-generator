import { Anchor } from "@mantine/core"
import { clsx } from "clsx"

import { Gmail } from "./Gmail.jsx"
import { Outlook } from "./Outlook.jsx"
import { ProtonMail } from "./ProtonMail.jsx"
import { ExternalLink } from "lucide-react"

type EmailProviderLinkProps = {
  className?: string
  email: string
}

export function EmailProviderLink({
  className,
  email,
}: EmailProviderLinkProps): null | React.JSX.Element {
  const providers = [
    {
      IconComponent: Gmail,
      label: "Gmail",
      suffix: "@gmail.com",
      url: "https://gmail.com",
    },
    {
      IconComponent: ProtonMail,
      label: "Proton Mail",
      suffix: "@proton.me",
      url: "https://mail.proton.me",
    },
    {
      IconComponent: Outlook,
      label: "Outlook",
      suffix: "@outlook.com",
      url: "https://outlook.com",
    },
  ]
  const provider = providers.find((provider) => email.endsWith(provider.suffix))
  if (provider) {
    const IconComponent = provider.IconComponent
    const providerLabel = provider.label

    return (
      <div className={clsx(className, "flex flex-row items-center gap-3")}>
        <IconComponent className="my-auto size-6" />

        <Anchor
          className="my-auto flex flex-row items-center gap-3"
          href={provider.url}
          target="blank"
        >
          <span className="my-auto w-max">Open {providerLabel}</span>

          <ExternalLink className="my-auto" />
        </Anchor>
      </div>
    )
  }

  return null
}
