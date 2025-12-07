import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { post } from '../../api';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

// --- Validatie Schema ---
const kampSchema = Yup.object().shape({
  naam: Yup.string()
    .required('Naam is verplicht')
    .max(40, 'Naam mag maximaal 40 tekens bevatten'),

  stad: Yup.string()
    .required('Stad is verplicht')
    .max(20, 'Stad mag maximaal 20 tekens bevatten'),

  startDatum: Yup.date()
    .required('Startdatum is verplicht')
    .min(
      // Creëert een Date object dat de start van de huidige dag (middernacht) vertegenwoordigt
      new Date(new Date().setHours(0, 0, 0, 0)),
      'Startdatum moet in de toekomst liggen',
    ),

  eindDatum: Yup.date()
    .required('Einddatum is verplicht')
    .test(
      'is-after',
      'Einddatum moet later zijn dan de startdatum',
      function (value) {
        const { startDatum } = this.parent;
        if (!startDatum || !value) return false;
        return value > startDatum;
      },
    ),
  beschrijving: Yup.string()
    .required('Beschrijving is verplicht')
    .max(1000, 'Beschrijving mag maximaal 1000 tekens bevatten'),

});

function KampForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        naam: '',
        stad: '',
        beschrijving: '',
        startDatum: '',
        eindDatum: '',
      }}
      validationSchema={kampSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await post('kampen', {
            naam: values.naam,
            stad: values.stad,
            beschrijving: values.beschrijving,
            startDatum: values.startDatum,
            eindDatum: values.eindDatum,
          });

          mutate('kampen');
          navigate('/kampen');
        } catch (err) {
          console.error(err);
          alert('Er ging iets mis bij het opslaan.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center items-center min-h-full">
          <div
            className="flex flex-col border-4 border-blue-300 rounded-4xl p-8 
            w-96 md:w-md lg:w-lg shadow-xl bg-white/70 backdrop-blur-sm"
          >
            {/* NAAM */}
            <label className="font-semibold text-blue-600 mb-1">Naam van het kamp</label>
            <Field
              name="naam"
              placeholder="Bijv. Zomerkamp Leuven"
              data-cy="input-naam"
              className="bg-blue-100 rounded-2xl w-full px-4 py-3 mb-1 outline-none
              shadow-sm focus:ring-2 focus:ring-blue-400 placeholder:text-blue-400"
            />
            <ErrorMessage name="naam" component="div" className="text-red-500 text-sm mb-3" />

            {/* STAD */}
            <label className="font-semibold text-blue-600 mb-1">Stad</label>
            <Field
              name="stad"
              placeholder="Bijv. Gent"
              data-cy="input-stad"
              className="bg-blue-100 rounded-2xl w-full px-4 py-3 mb-1 outline-none
              shadow-sm focus:ring-2 focus:ring-blue-400 placeholder:text-blue-400"
            />
            <ErrorMessage name="stad" component="div" className="text-red-500 text-sm mb-3" />

            {/* STARTDATUM */}
            <label className="font-semibold text-blue-600 mb-1">Startdatum</label>
            <Field
              type="date"
              name="startDatum"
              data-cy="input-start"
              className="bg-blue-100 rounded-2xl w-full px-4 py-3 mb-1 outline-none
              shadow-sm focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage name="startDatum" component="div" className="text-red-500 text-sm mb-3" />

            {/* EINDDATUM */}
            <label className="font-semibold text-blue-600 mb-1">Einddatum</label>
            <Field
              type="date"
              name="eindDatum"
              data-cy="input-eind"
              className="bg-blue-100 rounded-2xl w-full px-4 py-3 mb-1 outline-none
              shadow-sm focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage name="eindDatum" component="div" className="text-red-500 text-sm mb-4" />

            {/* BESCHRIJVING */}
            <label className="font-semibold text-blue-600 mb-1">Beschrijving</label>
            <Field
              as="textarea"
              name="beschrijving"
              placeholder="Bijv. Een avontuurlijk kamp met veel activiteiten"
              data-cy="input-beschrijving"
              className="bg-blue-100 rounded-2xl w-full px-4 py-3 mb-1 outline-none
              shadow-sm focus:ring-2 focus:ring-blue-400 placeholder:text-blue-400 h-28"
            />
            <ErrorMessage name="beschrijving" component="div" className="text-red-500 text-sm mb-3" />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              data-cy="submit-button"
              disabled={isSubmitting}
              className="mt-4 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white
              py-3 rounded-2xl transition-all shadow-md w-full"
            >
              Voeg kamp toe
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default KampForm;
