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
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background: #f9f9f9; padding: 40px 0; font-family: Arial, sans-serif;"
    >      
      <tr>     
        <td align="center">          
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"
          >            
            <tr>           
              <td style="background-color: #2c3e50; padding: 30px; text-align: center; color: #ffffff;">                
                <h1 style="margin: 0; font-size: 28px;">Kuchařův deník</h1>
              </td>
            </tr>
            <tr>              
              <td style="padding: 40px;">                
                <h2 style="margin-top: 0;">Obnova hesla</h2>
                <p style="font-size: 16px; line-height: 1.5; color: #333;">                  
                  Na základě žádosti o obnovu hesla Vám zasíláme odkaz, pomocí kterého můžete heslo změnit. Pokud jste žádost neposlal(a) Vy, tento e-mail ignorujte.
                </p>
                <div style="text-align: center; margin: 40px 0;">                  
                  <a
                    href="${resetUrl}"
                    style=" background: rgb(95, 139, 50); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; "
                  >
                    Obnovit heslo
                  </a>
                </div>
                <p style="font-size: 14px; color: #555;">                  
                  Tento odkaz vyprší za ${getExpirationText(expirationHours)}.
                </p>
                <p style="font-size: 14px; color: #555;">                  
                  S přáním pohodového vaření,
                  <br /> <strong>Tým Kuchařův deník</strong>
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
