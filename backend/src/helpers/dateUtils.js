import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatFecha(fecha) {
  return format(new Date(fecha), "PPpp", { locale: es });
}
