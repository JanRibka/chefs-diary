interface Props {
  resetUrl: string;
  expirationHours: number;
}

const getYear = () => {
  const actualYear = new Date().getFullYear();
  return actualYear === 2025 ? "2025" : `2025 - ${actualYear}`;
};

const getExpirationText = (hours: number): string => {
  if (hours === 1) {
    return "1 hodinu";
  } else if (hours >= 2 && hours <= 4) {
    return `${hours} hodiny`;
  }

  return `${hours} hodin`;
};

export default function passwordResetEmailTemplate({
  resetUrl,
  expirationHours,
}: Props): string {
  return `
    <!DOCTYPE html>
    <html lang="cs">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Obnovení hesla - Kuchařův deník</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #fef7f0 0%, #fef2f2 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(255, 87, 35, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 87, 35, 0.08);
        }

        .header {
          background: linear-gradient(135deg, #ff5723 0%, #ff6b35 50%, #ff1744 100%);
          padding: 48px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.15)"/><circle cx="10" cy="50" r="0.5" fill="rgba(255,255,255,0.15)"/><circle cx="90" cy="30" r="0.5" fill="rgba(255,255,255,0.15)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
        }

        .content {
          padding: 48px 40px;
        }

        .greeting {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 24px 0;
          line-height: 1.3;
        }

        .message {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0 0 32px 0;
        }

        .button-container {
          text-align: center;
          margin: 40px 0;
        }

        .button {
          display: inline-block;
          background: linear-gradient(135deg, #ff5723 0%, #ff6b35 50%, #ff1744 100%);
          color: #ffffff !important;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 16px rgba(255, 87, 35, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(255, 87, 35, 0.4);
        }

        .button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .button:hover::before {
          left: 100%;
        }

        .warning {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 20px;
          margin: 32px 0;
          font-size: 14px;
          color: #92400e;
          line-height: 1.5;
        }

        .warning strong {
          color: #78350f;
        }

        .footer {
          background: #f9fafb;
          padding: 32px 40px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }

        .footer p {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
        }

        .footer .signature {
          font-weight: 600;
          color: #374151;
        }

        .copyright {
          background: #ffffff;
          padding: 24px 40px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #9ca3af;
        }

        @media (max-width: 640px) {
          .container {
            padding: 20px 16px;
          }

          .header {
            padding: 32px 24px;
          }

          .header h1 {
            font-size: 28px;
          }

          .content {
            padding: 32px 24px;
          }

          .greeting {
            font-size: 20px;
          }

          .footer,
          .copyright {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>Kuchařův deník</h1>
          </div>

          <div class="content">
            <h2 class="greeting">Ahoj kuchaři! 👨‍🍳</h2>

            <p class="message">
              Na základě žádosti o obnovu hesla Vám zasíláme odkaz, pomocí kterého můžete heslo změnit.
              Klikněte na tlačítko níže a budete přesměrováni na stránku pro nastavení nového hesla.
            </p>

            <div class="button-container">
              <a href="${resetUrl}" class="button">
                🔐 Obnovit heslo
              </a>
            </div>

            <div class="warning">
              <strong>Důležité:</strong> Tento odkaz vyprší za ${getExpirationText(
                expirationHours
              )}. Pokud jste žádost neposlal(a) Vy, tento e-mail ignorujte a kontaktujte nás.
            </div>

            <p class="message">
              Přejeme hodně inspirace v kuchyni a skvělé recepty! 🍳✨<br />
              <span class="signature">Tým Kuchařův deník</span>
            </p>
          </div>

          <div class="footer">
            <p>
              Máte problémy s přihlášením? Napište nám na
              <a href="mailto:kucharuv.denik@gmail.com" style="color: #ff5723; text-decoration: none; font-weight: 500;">
                kucharuv.denik@gmail.com
              </a>
            </p>
          </div>

          <div class="copyright">
            © ${getYear()} Kuchařův deník. Všechna práva vyhrazena.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
