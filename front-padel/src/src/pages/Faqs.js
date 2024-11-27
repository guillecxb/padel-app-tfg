import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionTitle from "components/molecules/section-title/SectionTitle";
import { useGetFaqsQuery } from 'domain/service/apiSlices/faqApiSlice';
import { useFaqsTranslation } from "translations";

const Faqs = () => {
  // Usamos el hook de RTK Query para obtener las preguntas del backend
  const { data: faqs = [], isLoading, error } = useGetFaqsQuery(); 

  const t = useFaqsTranslation();

  if (isLoading) return <CircularProgress />; // Mostrar spinner mientras se cargan las FAQs
  if (error) return <Typography>{t("errorLoading")}</Typography>; // Manejar error

  return (
    <>
      <SectionTitle title={t("title")} />

      {/* Introducción sobre las preguntas frecuentes */}
      <Typography variant="h6" gutterBottom>
        {t("subtitle")}
      </Typography>

      {/* Acordeón para mostrar las preguntas y respuestas */}
      <Box mt={3}>
        {faqs.map((faq, index) => (
          <Accordion key={faq.id} style={{ marginBottom: '16px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight="bold">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default Faqs;
