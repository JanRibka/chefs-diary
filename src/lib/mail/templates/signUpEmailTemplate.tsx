interface Props {
  confirmationUrl: string;
  expirationDays: number;
}

const getYear = () => {
  const actualYear = new Date().getFullYear();

  if (actualYear === 2025) {
    return "2025";
  } else {
    return `2025 - ${actualYear}`;
  }
};

export default function signUpEmailTemplate({
  confirmationUrl,
  expirationDays,
}: Props): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; padding: 40px 0; font-family: Arial, sans-serif;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <tr>
              <td style="background-color: #2c3e50; padding: 30px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 28px;">Kuchařův deník</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px;">
                <h2 style="margin-top: 0;">Ahoj kuchaři,</h2>
                <p style="font-size: 16px; line-height: 1.5; color: #333;">
                  Děkujeme za registraci na webu <strong>Kuchařův deník</strong>! Než začneš sdílet a ukládat recepty, je potřeba ověřit tvou e-mailovou adresu.
                </p>
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${confirmationUrl}" style="
                    background: rgb(95, 139, 50);
                    color: #ffffff;
                    text-decoration: none;
                    padding: 15px 30px;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 16px;
                    display: inline-block;
                  ">Potvrdit e-mail</a>
                </div>
                <p style="font-size: 14px; color: #555;">
                  Tento odkaz vyprší za ${expirationDays} hodin. Pokud jsi o registraci nežádal(a), tento e-mail můžeš ignorovat.
                </p>
                <p style="font-size: 14px; color: #555;">
                  Přejeme hodně inspirace v kuchyni!<br />
                  <strong>Tým Kuchařův deník</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f0f0f0; text-align: center; padding: 20px; font-size: 12px; color: #888;">
                &copy; ${getYear()} Kuchařův deník. Všechna práva vyhrazena.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
