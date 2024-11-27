import { useCallback, useState } from "react";
import PropTypes from "prop-types"; // se utiliza para validar las props que recibe el hook, garantizando que se usen correctamente en el desarrollo

// usePaperButton -> para proporcionar funcionalidad interactiva y estilos dinámicos a un componente de botón. Recibe dos argumentos:
//        - isDisabled: un booleano que indica si el botón está deshabilitado.
//        - mouseHoverElevation: un número que indica la elevación del botón cuando el mouse está sobre él. (valor por defecto: 5)
const usePaperButton = ({ isDisabled, mouseHoverElevation = 5 }) => {
  const [elevation, setElevation] = useState(1); // Usado para definir la elevación visual del botón (sombra proyectada bajo el componente), comienza en 1.
  const [hoverColor, setHoverColor] = useState("text.primary"); // Color del texto del título del paper button (nombre del service) cuando el mouse está sobre él, comienza en "text.primary".

  // handleOnMouseOver -> función que se ejecuta cuando el mouse pasa sobre el botón, cambia la elevación y el color del botón.
  const handleOnMouseOver = useCallback(() => {
    setElevation(mouseHoverElevation);
    setHoverColor("primary");
  }, [mouseHoverElevation]);

  // handleOnMouseOut -> función que se ejecuta cuando el mouse sale del botón, cambia la elevación y el color del botón.
  const handleOnMouseOut = useCallback(() => {
    setElevation(1);
    setHoverColor("text.primary");
  }, []);

  // devuelve un objeto con 2 propiedades:
  //        - color: Color del texto del título del paper button (nombre del service) cuando el mouse está sobre él, comienza en "text.primary".
  //        - paperButtonProps: Propiedades del paper button, incluyendo si está deshabilitado, el color del botón, y las funciones que se ejecutan cuando el mouse pasa sobre y sale del el botón.
  return {
    color: hoverColor,
    paperButtonProps: {
      disabled: isDisabled,
      color: hoverColor,
      ...(!isDisabled && {
        onMouseOut: handleOnMouseOut,
        onMouseOver: handleOnMouseOver,
      }),
      elevation,
    },
  };
};

// define los tipos esperados para las propiedades que recibe el hook
usePaperButton.propTypes = {
  isDisabled: PropTypes.bool,
  mouseHoverElevation: PropTypes.number,
};

export default usePaperButton;
