import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { postData } from '../../api';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

// --- Validatie Schema ---
const kampSchema = Yup.object().shape({
  naam: Yup.string().required('Naam is verplicht'),
  locatie: Yup.string().required('Stad is verplicht'),
  startDatum: Yup.date()
    .required('Startdatum is verplicht')
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      'Startdatum moet in de toekomst liggen',
    ),
  eindDatum: Yup.date()
    .required('Einddatum is verplicht')
    .when(
      'startDatum',
      (startDatum, schema) =>
        startDatum &&
        schema.min(startDatum, 'Einddatum moet na de startdatum liggen'),
    ),
});

function KampForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        naam: '',
        locatie: '',
        startDatum: '',
        eindDatum: '',
      }}
      validationSchema={kampSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await postData('kampen', {
            naam: values.naam,
            locatie: values.locatie,
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
              name="locatie"
              placeholder="Bijv. Gent"
              data-cy="input-locatie"
              className="bg-blue-100 rounded-2xl w-full px-4 py-3 mb-1 outline-none
              shadow-sm focus:ring-2 focus:ring-blue-400 placeholder:text-blue-400"
            />
            <ErrorMessage name="locatie" component="div" className="text-red-500 text-sm mb-3" />

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
