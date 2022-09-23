const re = /^[a-zA-Z]*$/;

export default function (origin) {
  return re.test(origin);
}
