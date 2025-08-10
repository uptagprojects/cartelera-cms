import { UserEmail } from "../../../cma/users/domain/UserEmail";
import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";
import { WelcomeEmailSentDomainEvent } from "./event/WelcomeEmailSentDomainEvent";

export type WelcomeEmailPrimitives = {
    id: string;
    userId: string;
    userName: string;
    presenterName: string;
    presenterEmailAddress: string;
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
};

export class WelcomeEmail extends Email {
    public static readonly template = "welcome_email";
    private static readonly from = process.env.SYSTEM_EMAIL_SENDER ?? "PNFi <octagon@pnfi.pro>";

    private constructor(
        id: EmailId,
        from: EmailAddress,
        to: EmailAddress,
        subject: EmailSubject,
        html: EmailHTMLBody,
        text: EmailTextBody,
        private readonly userId: UserId,
        private readonly userName: string,
        private readonly presenterName: string,
        private readonly presenterEmailAddress: UserEmail
    ) {
        super(id, from, to, subject, html, text);
    }

    static send(
        id: string,
        userId: string,
        name: string,
        emailAddress: string,
        presenterName: string,
        presenterEmailAddress: string,
        confirmationUrl: string
    ): WelcomeEmail {
        const from = new EmailAddress(WelcomeEmail.from);
        const subject = WelcomeEmail.generateSubject(name);
        const html = WelcomeEmail.generateHTML(
            name,
            emailAddress,
            presenterName,
            presenterEmailAddress,
            confirmationUrl
        );
        const text = WelcomeEmail.generateText(
            name,
            emailAddress,
            presenterName,
            presenterEmailAddress,
            confirmationUrl
        );

        const email = new WelcomeEmail(
            new EmailId(id),
            from,
            new EmailAddress(emailAddress),
            subject,
            html,
            text,
            new UserId(userId),
            name,
            presenterName,
            new UserEmail(presenterEmailAddress)
        );

        email.record(
            new WelcomeEmailSentDomainEvent(
                id,
                userId,
                name,
                from.value,
                emailAddress,
                subject.value,
                html.value,
                text.value
            )
        );

        return email;
    }

    static fromPrimitives(primitives: WelcomeEmailPrimitives): WelcomeEmail {
        return new WelcomeEmail(
            new EmailId(primitives.id),
            new EmailAddress(primitives.from),
            new EmailAddress(primitives.to),
            new EmailSubject(primitives.subject),
            new EmailHTMLBody(primitives.html),
            new EmailTextBody(primitives.text),
            new UserId(primitives.userId),
            primitives.userName,
            primitives.presenterName,
            new UserEmail(primitives.presenterEmailAddress)
        );
    }

    private static generateSubject(userName: string): EmailSubject {
        return new EmailSubject(`Bienvenido al PNFi, ${userName}`);
    }

    private static generateHTML(
        userName: string,
        userEmail: string,
        inviteFromUserName: string,
        inviteFromUserEmail: string,
        confirmationUrl: string
    ): EmailHTMLBody {
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
    Bienvenido al PNFi, ${userName}, confirma tu correo
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
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
              Únete a la cartelera del <strong>PNFi</strong>
            </h1>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              Hola
              <!-- -->alanturing<!-- -->,
            </p>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              <strong>${inviteFromUserName}</strong> (<a
                href="mailto:${inviteFromUserEmail}"
                style="color:rgb(234,88,12);text-decoration-line:none"
                target="_blank"
                >alan.turing@example.com</a
              >) te ha invitado a participar en la
              <strong>cartelera</strong> del<!-- -->
              <strong>PNFi</strong>.
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
                    <a
                      href="${confirmationUrl}"
                      style="background-color:rgb(249,115,22);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:12px 20px 12px 20px"
                      target="_blank"
                      ><span
                        ><!--[if mso
                          ]><i
                            style="mso-font-width:500%;mso-text-raise:18"
                            hidden
                            >&#8202;&#8202;</i
                          ><!
                        [endif]--></span
                      ><span
                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
                        >Confirma tu correo</span
                      ><span
                        ><!--[if mso
                          ]><i style="mso-font-width:500%" hidden
                            >&#8202;&#8202;&#8203;</i
                          ><!
                        [endif]--></span
                      ></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              o copia y pega esta URL en tu navegador:<!-- -->
              <a
                href="https://vercel.com/teams/invite/foo"
                style="color:rgb(234,88,12);text-decoration-line:none"
                target="_blank"
                >${confirmationUrl}</a>
            </p>
            <hr
              style="border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px;width:100%;border:none;border-top:1px solid #eaeaea"
            />
            <p
              style="color:rgb(102,102,102);font-size:12px;line-height:24px;margin:16px 0"
            >
              Esta invitación es exclusiva para<!-- -->
              <span style="color:rgb(0,0,0)">${userEmail}</span>. Si no esperabas
              esta invitación, puedes ignorar este email. Si estás interesado en
              la seguridad de tu cuenta, por favor contacte con soporte@pnfi.pro
              y nos pondremos en contacto contigo.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>

`
        );
    }

    private static generateText(
        userName: string,
        userEmail: string,
        inviteFromUserName: string,
        inviteFromUserEmail: string,
        confirmationUrl: string
    ): EmailTextBody {
        return new EmailTextBody(
            `ÚNETE A LA CARTELERA DEL PNFI

Hola ${userName},

${inviteFromUserName} (${inviteFromUserEmail}) te ha invitado a
participar en la cartelera del PNFi.



Confirma tu correo ${confirmationUrl}

o copia y pega esta URL en tu navegador: https://vercel.com/teams/invite/foo
https://vercel.com/teams/invite/foo

--------------------------------------------------------------------------------

Esta invitación es exclusiva para ${userEmail}. Si no esperabas esta invitación,
puedes ignorar este email. Si estás interesado en la seguridad de tu cuenta, por
favor contacte con soporte@pnfi.pro y nos pondremos en contacto contigo.
`
        );
    }

    toPrimitives(): WelcomeEmailPrimitives {
        return {
            id: this.id.value,
            userId: this.userId.value,
            userName: this.userName,
            presenterName: this.presenterName,
            presenterEmailAddress: this.presenterEmailAddress.value,
            from: this.from.value,
            to: this.to.value,
            subject: this.subject.value,
            html: this.html.value,
            text: this.text.value
        };
    }
}
