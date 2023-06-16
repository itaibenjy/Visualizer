/**
 * A component that displays an alert message with an icon based on the type of alert.
 * @param {string} message - The message to display in the alert.
 * @param {string} type - The type of alert to display (primary, success, danger, warning, info, secondary, light, or dark).
 * @returns {JSX.Element} - The JSX code to display the alert.
 */
function Alert({message, type}) {
  const iconDict = {primary: "fa-info-circle", success: "fa-check-circle", danger: "fa-times-circle", warning: "fa-exclamation-circle", info: "fa-chevron-circle-right", secondary: "fa-circle", light: "fa-gratipay", dark: "fa-gem"}
  return    <div className={`alert alert-${type} py-2 `} role="alert" data-mdb-color={type}>
                <i className={`fas ${iconDict[type]} me-3`}></i>{message}
            </div>;
}

export default Alert;
