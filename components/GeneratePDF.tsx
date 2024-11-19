import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Button from './elements/Button';
import Toast from 'react-native-root-toast';
import { SelfReport } from '../types';
import { FORM_QUESTIONS } from '../constants';
import { formatDateWithTime } from '../utils';

const renderSection = (title: string, content: string | null, discomfort: number | null) => {
  if (content) {
    return `
      <div class="section">
        <h2>${title}</h2>
        ${null != discomfort ? `<p><strong>Malestar:</strong> ${discomfort}</p>` : ''}
        ${`<p>${content}</p>`}
      </div>
    `;
  }
  return '';
};

const generateHTMLContentForSelfReport = (selfReport: SelfReport) => {
  return `
    <div class="selfReport">
      <h1 class="title">Autorregistro: ${formatDateWithTime(new Date(selfReport.date))}</h1>

      ${renderSection(FORM_QUESTIONS.precedent.title, selfReport.precedent, null)}  
      ${renderSection(
        FORM_QUESTIONS.event.title,
        selfReport.event.text,
        selfReport.event.discomfort
      )}

      ${renderSection(FORM_QUESTIONS.thoughts.title, selfReport.thoughts, null)}
      ${renderSection(
        FORM_QUESTIONS.reflections.title,
        selfReport.reflections.text,
        selfReport.reflections.discomfort
      )}

      ${renderSection(FORM_QUESTIONS.otherActions.title, selfReport.otherActions, null)}
    </div>
  `;
};

export default function GeneratePDF({ selfReports }: { selfReports: SelfReport[] }) {
  const htmlContent = selfReports
    .map((report) => generateHTMLContentForSelfReport(report))
    .join('');

  const generatePdf = async () => {
    try {
      const file = await printToFileAsync({
        html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              margin-inline: 2rem;
            }
            h1, h2 {
              color: #2C3E50;
            }
            h1{
            font-size: 1.35rem
            margin-bomttom: 2rem;
            
            }
            h2 { 
              font-size: 1.25rem
            }
            p{
            font-size: 1rem 
            }
            .section {
              margin-bottom: 1.5rem;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `,
      });

      await shareAsync(file.uri, { mimeType: 'application/pdf' });
    } catch (_error) {
      Toast.show('No se pudo generar el archivo PDF', {
        duration: Toast.durations.SHORT,
      });
    }
  };
  return <Button type='primary' title='Generar PDF' onPress={generatePdf} />;
}
