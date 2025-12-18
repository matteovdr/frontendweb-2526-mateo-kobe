import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { post } from '../../api';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

// --- Validatie Schema ---
const kampSchema = Yup.object().shape({
  naam: Yup.string()
    .required('Naam is verplicht')
    .min(2, 'Naam moet minstens 2 tekens bevatten')
    .max(255, 'Naam mag maximaal 255 tekens bevatten'),

  stad: Yup.string()
    .required('Stad is verplicht')
    .min(2, 'Stad moet minstens 2 tekens bevatten')
    .max(255, 'Stad mag maximaal 255 tekens bevatten'),

  startDatum: Yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : new Date(originalValue)))
    .typeError('Startdatum is verplicht')
    .required('Startdatum is verplicht')
    .test('not-in-past', 'Startdatum mag niet in het verleden liggen', (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value >= today;
    }),

  eindDatum: Yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : new Date(originalValue)))
    .typeError('Einddatum is verplicht')
    .required('Einddatum is verplicht')
    .min(Yup.ref('startDatum'), 'Einddatum moet later zijn dan de startdatum'),
  beschrijving: Yup.string()
    .required('Beschrijving is verplicht')
    .min(10, 'Beschrijving moet minstens 10 tekens bevatten')
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
          await post('kampen', { arg: values });

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
        <Form className="min-h-[70vh] bg-linear-to-b from-gray-50 via-white to-gray-100 
        dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center py-10 px-4">
          <div className="w-full max-w-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-3xl 
          shadow-2xl border border-white/40 dark:border-gray-800 p-7 md:p-9">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">Nieuw kamp</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">Plan een kamp in</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Vul de details in zodat iedereen zich kan inschrijven en voorbereid kan vertrekken.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* NAAM */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800 dark:text-gray-200 mb-1 block">Naam van het kamp</label>
                <Field
                  name="naam"
                  placeholder="Bijv. Zomerkamp Leuven"
                  data-cy="input-naam"
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 placeholder:text-gray-400"
                />
                <ErrorMessage name="naam" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* STAD */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800 dark:text-gray-200 mb-1 block">Stad</label>
                <Field
                  name="stad"
                  placeholder="Bijv. Gent"
                  data-cy="input-stad"
                  className="w-full rounded-2xl border border-gray-200 
                  dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 shadow-sm focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                />
                <ErrorMessage name="stad" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* STARTDATUM */}
              <div>
                <label className="font-semibold text-gray-800 dark:text-gray-200 mb-1 block">Startdatum</label>
                <Field
                  type="date"
                  name="startDatum"
                  data-cy="input-start"
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white 
                  dark:bg-gray-800 px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="startDatum" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* EINDDATUM */}
              <div>
                <label className="font-semibold text-gray-800 dark:text-gray-200 mb-1 block">Einddatum</label>
                <Field
                  type="date"
                  name="eindDatum"
                  data-cy="input-eind"
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white 
                  dark:bg-gray-800 px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="eindDatum" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* BESCHRIJVING */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800 dark:text-gray-200 mb-1 block">Beschrijving</label>
                <Field
                  as="textarea"
                  name="beschrijving"
                  placeholder="Bijv. Een avontuurlijk kamp met veel activiteiten"
                  data-cy="input-beschrijving"
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white 
                  dark:bg-gray-800 px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 placeholder:text-gray-400 h-28"
                />
                <ErrorMessage name="beschrijving" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <button
              type="submit"
              data-cy="submit-button"
              disabled={isSubmitting}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 
              to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-2xl shadow-lg 
              hover:shadow-xl transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Opslaan...' : 'Voeg kamp toe'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default KampForm;
