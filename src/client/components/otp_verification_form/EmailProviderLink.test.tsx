import { EmailProviderLink } from "#client/components/otp_verification_form"
import { TestAppWrapper } from "#client/test/app_wrapper"
import { render, screen } from "@testing-library/react"
import { afterAll, describe, it } from "vitest"
import MatchMediaMock from "vitest-matchmedia-mock"

describe("EmailProviderLink", () => {
  const matchMediaMock = new MatchMediaMock()
  afterAll(() => {
    matchMediaMock.clear()
  })

  it("displays link for Gmail", async () => {
    render(<EmailProviderLink email="meow@gmail.com" />, {
      wrapper: TestAppWrapper,
    })

    await screen.findByText("Open Gmail", { exact: false })
  })

  it("doesn't display any link for unsupported email providers", ({
    expect,
  }) => {
    render(<EmailProviderLink email="meow@meow-meow.dev" />)
    expect(screen.queryByText("Open Gmail", { exact: false })).toBeNull()
    expect(screen.queryByText("Open Proton", { exact: false })).toBeNull()
    expect(screen.queryByText("Open Outlook", { exact: false })).toBeNull()
  })
})
