import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";
import { MagicLinkEmailSentDomainEvent } from "./event/MagicLinkEmailSentDomainEvent";

export type MagicLinkEmailPrimitives = {
    id: string;
    userId: string;
    userName: string;
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
};

export class MagicLinkEmail extends Email {
    private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>";

    private constructor(
        id: EmailId,
        from: EmailAddress,
        to: EmailAddress,
        subject: EmailSubject,
        html: EmailHTMLBody,
        text: EmailTextBody,
        private readonly userId: UserId,
        private readonly userName: string
    ) {
        super(id, from, to, subject, html, text);
    }

    static send(id: string, userId: string, name: string, emailAddress: string, code: string): MagicLinkEmail {
        const from = new EmailAddress(MagicLinkEmail.from);
        const subject = MagicLinkEmail.generateSubject(name);
        const html = MagicLinkEmail.generateHTML(name, code);
        const text = MagicLinkEmail.generateText(name, code);

        const email = new MagicLinkEmail(
            new EmailId(id),
            from,
            new EmailAddress(emailAddress),
            subject,
            html,
            text,
            new UserId(userId),
            name
        );

        email.record(new MagicLinkEmailSentDomainEvent(id, userId, name, from.value, emailAddress, subject.value));

        return email;
    }

    static fromPrimitives(primitives: MagicLinkEmailPrimitives): MagicLinkEmail {
        return new MagicLinkEmail(
            new EmailId(primitives.id),
            new EmailAddress(primitives.from),
            new EmailAddress(primitives.to),
            new EmailSubject(primitives.subject),
            new EmailHTMLBody(primitives.html),
            new EmailTextBody(primitives.text),
            new UserId(primitives.userId),
            primitives.userName
        );
    }

    private static generateSubject(userName: string): EmailSubject {
        return new EmailSubject(`Inicio de sesión en el PNFi`);
    }

    private static generateHTML(userName: string, code: string): EmailHTMLBody {
        const magicLink = this.generateMagicLink(code);
        return new EmailHTMLBody(
            `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="es">
  <head>
    <link rel="preload" as="image" href="https://pnfi.pro/octagon.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
  >
    Inicia sesión con este link mágico
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
    </div>
  </div>
  <body
    style='background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-left:0.5rem;padding-right:0.5rem'
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px;max-width:465px"
    >
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top:32px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="PNFi"
                      height="37"
                      src="https://pnfi.pro/octagon.png"
                      style="margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto;display:block;outline:none;border:none;text-decoration:none"
                      width="40"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h1
              style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px"
            >
              Inicia sesión en el PNFi
            </h1>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              <a
                href="${magicLink}"
                style="color:rgb(234,88,12);text-decoration-line:none"
                target="_blank"
                >Click aquí para iniciar sesión con el link mágico</a
              >
            </p>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              o copia y pega este código de inicio de sesión temporal:
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center;margin-top:32px;margin-bottom:32px"
            >
              <tbody>
                <tr>
                  <td>
                    <code
                      style="display:inline-block;padding:16px 4.5%;width:90.5%;background-color:#f4f4f4;border-radius:5px;border:1px solid #eee;color:#333;font-size:24px"
                      >${code}</code>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px;width:100%;border:none;border-top:1px solid #eaeaea"
            />
            <p
              style="color:rgb(102,102,102);font-size:12px;line-height:24px;margin:16px 0"
            >
              Esta código es exclusivo para<!-- -->
              <span style="color:rgb(0,0,0)">${userName}</span>. Si no pediste
              iniciar sesión en el PNFi, puedes ignorar este email. Si estás
              interesado en la seguridad de tu cuenta, por favor contacte con
              soporte@pnfi.pro y nos pondremos en contacto contigo.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>`
        );
    }

    private static generateText(userName: string, code: string): EmailTextBody {
        const magicLink = this.generateMagicLink(code);
        return new EmailTextBody(
            `INICIA SESIÓN EN EL PNFI

Inicia sesión con el link mágico:
${magicLink}

o copia y pega este código de inicio de sesión temporal:

${code}

--------------------------------------------------------------------------------

Esta código es exclusivo para ${userName}. Si no pediste iniciar sesión en el
PNFi, puedes ignorar este email. Si estás interesado en la seguridad de tu
cuenta, por favor contacte con soporte@pnfi.pro y nos pondremos en contacto
contigo.`
        );
    }

    toPrimitives(): MagicLinkEmailPrimitives {
        return {
            id: this.id.value,
            userId: this.userId.value,
            userName: this.userName,
            from: this.from.value,
            to: this.to.value,
            subject: this.subject.value,
            html: this.html.value,
            text: this.text.value
        };
    }

    private static generateMagicLink(code: string): string {
        return `https://pnfi.pro/login?magic-link=${code}`;
    }
}
