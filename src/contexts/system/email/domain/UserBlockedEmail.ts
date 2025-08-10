import { UserId } from "../../../cma/users/domain/UserId";
import { EmailAddress } from "../../../shared/domain/EmailAddress";
import { Email } from "./Email";
import { EmailHTMLBody } from "./EmailHTMLBody";
import { EmailId } from "./EmailId";
import { EmailSubject } from "./EmailSubject";
import { EmailTextBody } from "./EmailTextBody";
import { UserBlockedEmailSentDomainEvent } from "./event/UserBlockedEmailSentDomainEvent";

export type UserBlockedEmailPrimitives = {
    id: string;
    userId: string;
    userName: string;
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
};

export class UserBlockedEmail extends Email {
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

    static send(id: string, userId: string, name: string, emailAddress: string): UserBlockedEmail {
        const from = new EmailAddress(UserBlockedEmail.from);
        const subject = UserBlockedEmail.generateSubject(name);
        const html = UserBlockedEmail.generateHTML(name);
        const text = UserBlockedEmail.generateText(name);

        const email = new UserBlockedEmail(
            new EmailId(id),
            from,
            new EmailAddress(emailAddress),
            subject,
            html,
            text,
            new UserId(userId),
            name
        );

        email.record(
            new UserBlockedEmailSentDomainEvent(
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

    static fromPrimitives(primitives: UserBlockedEmailPrimitives): UserBlockedEmail {
        return new UserBlockedEmail(
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
        return new EmailSubject(`Has sido bloqueado del PNFi, ${userName}`);
    }

    private static generateHTML(userName: string): EmailHTMLBody {
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
    No podrás acceder a tu cuenta del PNFi
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
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
              Tu acceso ha sido bloqueado
            </h1>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              Hola,
              <!-- -->${userName}<!-- -->
            </p>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              Has sido bloqueado del PNFi. Eso implica que no puedes acceder a
              tu cuenta, publicar o ver contenido no publicado en la plataforma.
            </p>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              Si crees que esto es un error, puedes contactar al administrador
              de la plataforma.
            </p>
            <p
              style="color:rgb(0,0,0);font-size:14px;line-height:24px;margin:16px 0"
            >
              Saludos, El equipo de PNFi
            </p>
            <hr
              style="border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px;width:100%;border:none;border-top:1px solid #eaeaea"
            />
            <p
              style="color:rgb(102,102,102);font-size:12px;line-height:24px;margin:16px 0"
            >
              Este correo es exclusivo para<!-- -->
              <span style="color:rgb(0,0,0)">${userName}</span>. Si no esperabas esta
              invitación, puedes ignorar este email. Si estás interesado en la
              seguridad de tu cuenta, por favor contacte con soporte@pnfi.pro y
              nos pondremos en contacto contigo.
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

    private static generateText(userName: string): EmailTextBody {
        return new EmailTextBody(
            `TU ACCESO HA SIDO BLOQUEADO

Hola, ${userName}

Has sido bloqueado del PNFi. Eso implica que no puedes acceder a tu cuenta,
publicar o ver contenido no publicado en la plataforma.

Si crees que esto es un error, puedes contactar al administrador de la
plataforma.

Saludos, El equipo de PNFi

--------------------------------------------------------------------------------

Este correo es exclusivo para ${userName}. Si no esperabas esta invitación, puedes
ignorar este email. Si estás interesado en la seguridad de tu cuenta, por favor
contacte con soporte@pnfi.pro y nos pondremos en contacto contigo.`
        );
    }

    toPrimitives(): UserBlockedEmailPrimitives {
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
}
