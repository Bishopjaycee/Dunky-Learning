interface Props {
  phoneNumber: string;
  school: string;
  name: string;
  serialNumber: number;
}
/**
 *
 * @param payload { phoneNumber: string, school: string, name: string, serialNumber: number}
 * @returns string
 */
export default function regNoGenerator(payload: Props) {
  let last4digits = payload.phoneNumber.match(/\d{4}$/)?.join("");
  let nameAbv = payload.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .match(/^\w{2}/)
    ?.join("")
    .toUpperCase()
    .trim();
  let schoolAbv = payload.school
    .split(" ")
    .map((school) => school.charAt(0))
    .join("")
    .match(/^\w{2}/)
    ?.join("")
    .toUpperCase()
    .trim();
  let number =
    payload.serialNumber < 10
      ? "0" + payload.serialNumber
      : payload.serialNumber;

  return `${schoolAbv}/${nameAbv}/${last4digits}/${number}`;
}
