import { useForm } from "../hook/useForm";
import { Link } from "react-router-dom";
import "../styles/newBreed.css";

const initialForm = {
  //son los valores inciales del formulario
  name: "",
  heightMin: "",
  heightMax: "",
  weightMin: "",
  weightMax: "",
  life_span_min: "",
  life_span_max: "",
  temperament: [],
  image: "",
};

const validationsForm = (form) => {
  //una funcion que recibe los datos del formulario

  let errors = {}; //esta variable guarda los errores
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //expresion regular valida que solo se acepten mayúsculas y minúsculas
  let regexNumbers = /^[0-9]\d*(\.\d+)?$/; //  /[0-9]/ es otra expresión regular para numeros

  if (!form.name.trim()) {
    //el trim() evalua que tenga información, que no haya espacios en blanco
    errors.name = "El campo Nombre es requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' solo acepta letras y espacios en blanco";
  }

  if (!form.heightMin) {
    errors.heightMin = "El campo es requerido";
  } else if (!regexNumbers.test(form.heightMin.trim())) {
    //validacion heightMin
    errors.heightMin = "Solo números";
  } else if (form.heightMin <= 10) {
    errors.heightMin = "Altura mínima promedio no debe ser menor a 10 cm";
  } else if (form.heightMin >= 110) {
    errors.heightMin = "Altura máxima promedio no debe ser mayor a 110 cm";
  }

  if (!form.heightMax) {
    errors.heightMax = "El campo es requerido";
  } else if (!regexNumbers.test(form.heightMax.trim())) {
    //validación heightMax
    errors.heightMax = "Solo números";
  } else if (parseInt(form.heightMax) <= parseInt(form.heightMin)) {
    errors.heightMax = "La altura máxima deber ser mas alta que la mínima";
  } else if (form.heightMax >= 130) {
    errors.heightMax = "La altura máxima no puede ser superior a 130 cm";
  }

  if (!form.weightMin) {
    errors.weightMin = "El campo es requerido";
  } else if (!regexNumbers.test(form.weightMin.trim())) {
    //validación weightMin
    errors.weightMin = "Solo números";
  } else if (form.weightMin <= 1) {
    errors.weightMin = "El peso mínimo no debe ser menor a 1 kg";
  } else if (form.weightMin >= 70) {
    errors.weightMin = "La peso mínimo no puede superar 70 kg ";
  }

  if (!form.weightMax) {
    errors.weightMax = "El campo es requerido";
  } else if (!regexNumbers.test(form.weightMax.trim())) {
    //validación weightMax
    errors.weightMax = "Solo números";
  } else if (parseInt(form.weightMax) <= parseInt(form.weightMin)) {
    errors.weightMax = "El peso máximo debe ser mas alto que el peso mínimo";
  } else if (form.weightMax >= 150) {
    errors.weightMax = "El peso máximo no debe ser más de 150 kg";
  }

  if (!form.life_span_min) {
    errors.life_span_min = "El campo es requerido";
  } else if (!regexNumbers.test(form.life_span_min.trim())) {
    //validación life_span_min
    errors.life_span_min = "Solo números";
  } else if (form.life_span_min <= 5) {
    errors.life_span_min = "La esperanza de vida no puede ser menor a 5 años";
  } else if (form.life_span_min >= 15) {
    errors.life_span_min = "La esperanza de vida no puede ser mayor a 15 años";
  }

  if (!form.life_span_max) {
    errors.life_span_max = "El campo es requerido";
  } else if (!regexNumbers.test(form.life_span_max.trim())) {
    //validación life_span_max
    errors.life_span_max = "Solo números";
  } else if (parseInt(form.life_span_max) <= parseInt(form.life_span_min)) {
    errors.life_span_max =
      "La esperanza máxima de vida no debe ser menor a la mínima";
  } else if (form.life_span_max >= 20) {
    errors.life_span_max =
      "La esperanza máxima de vida no debe ser mayor a 20 años";
  }
  if (form.image === "") {
    form.image =
      "https://i.pinimg.com/564x/9b/92/b4/9b92b4f32a1c318c406796016bc9bd1c.jpg";
    errors.image = "Si no ingresa URL se establece imagen predeterminada";
  }

  if (form.temperament.length === 0) {
    errors.temperament = "Se requiere mínimo un temperamento";
  }

  return errors;
};

const AddBreed = () => {
  const {
    // se hace destructuracion de useForm
    form,
    errors,
    temperament,
    handleChange,
    handleBlur,
    handleTemperaments,
    removeTemperaments,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // useForm tiene los valores iniciales del formulario y la validaciones

  return (
    <div className="cont">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="nav">
            <Link to="/dogs">
              <button className="button"> Home </button>
            </Link>

            <input type="submit" value="Create" className="button" />
          </div>
          <h4 className="title"> Create New Breed</h4>
          <div>
            <label className="labelName"> Name</label>
            <input
              className="input" //input name
              type="text"
              name="name"
              placeholder="Name Breed"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.name}
              require="true"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <label className="labelHeightMin"> Height Min</label>
            <input
              className="input" //input heightMin en cm
              type="text"
              name="heightMin"
              placeholder="height_min"
              maxLength={3}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.heightMin}
              require="true"
            />
            {errors.heightMin && (
              <span className="error">{errors.heightMin}</span>
            )}
          </div>
          <div>
            <label className="labelHeightMax"> Height Max</label>
            <input
              className="input" // input heightMax en cm
              type="text"
              name="heightMax"
              placeholder="height_max"
              maxLength={3}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.heightMax}
              require="true"
            />
            {errors.heightMax && (
              <span className="error">{errors.heightMax}</span>
            )}
          </div>
          <div>
            <label className="labelWeightMin"> Weight Min</label>
            <input
              className="input" //input weightMin en kg
              type="text"
              name="weightMin"
              placeholder="weight_min"
              maxLength={2}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.weightMin}
              require="true"
            />
            {errors.weightMin && (
              <span className="error">{errors.weightMin}</span>
            )}
          </div>
          <div>
            <label className="labelWeightMax"> Weight Max</label>
            <input
              className="input" //input weightMax en kg
              type="text"
              name="weightMax"
              placeholder="weight_max"
              maxLength={3}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.weightMax}
              require="true"
            />
            {errors.weightMax && (
              <span className="error">{errors.weightMax}</span>
            )}
          </div>
          <div>
            <label className="labelLife_span_min"> Life Span Min</label>
            <input
              className="input" //input life_span_min
              type="text"
              name="life_span_min"
              placeholder="life_span_min"
              maxLength={2}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.life_span_min}
              require="true"
            />
            {errors.life_span_min && (
              <span className="error">{errors.life_span_min}</span>
            )}
          </div>
          <div>
            <label className="labelLife_span_max"> Life Span Max</label>
            <input
              className="input" //input life_span_max
              type="text"
              name="life_span_max"
              placeholder="life_span_max"
              maxLength={2}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.life_span_max}
              require="true"
            />
            {errors.life_span_max && (
              <span className="error">{errors.life_span_max}</span>
            )}
          </div>
          <div>
            <label className="labelImage"> Image</label>
            <input
              className="input" //input image
              type="text"
              name="image"
              placeholder="image or url-image"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.image}
              require="true"
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <div>
            <label className="labelTemperaments">Temperaments</label>
            <div>
              <select
                onChange={handleTemperaments}
                require="true"
                className="select">
                <option disabled defaultValue="Temperaments">
                  Temperaments
                </option>
                {temperament.map((e, index) => (
                  <option value={e.name} name="temperaments" key={index}>
                    {e.name}
                  </option>
                ))}
              </select>

              {errors.temperament && (
                <span className="error">{errors.temperament}</span>
              )}
            </div>
          </div>
          <div>
            {form.temperament.map((c, index) => (
              <button
                value={c}
                onClick={removeTemperaments}
                onBlur={handleBlur}
                key={index}
                className="button">
                {c} X
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBreed;
