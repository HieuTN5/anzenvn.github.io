const COOKIE_NAMES = {
  REFRESH_TOKEN: 'refreshToken',
  ID_TOKEN: 'idToken',
  USERNAME: 'userName',
  FULLNAME: 'fullName',
  USER_ROLE: 'role',
  EMAIL: 'email',
  USING_2FA: 'using2fa',
  IP_ADDRESS: 'ipAddress',
};

const LOCAL_STORAGE_NAMES = {
  CURRENT_USER_INFO: 'current-user-info',
};

const REQUEST_TYPE_FORM = 'form';

const EVENT_EMITTER_NAMES = {
  REFRESH_TOKEN: 'refreshToken',
};

const REGEX = {
  PHONE_NUMBER: /^(0|\+?84)\d{9}$/,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/,
  // eslint-disable-next-line no-control-regex
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  IDENTIFY: /^[0-9]{9}$/,
  NUMBER: /^\d+$/,
  ID_NO: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  BET_AMOUNT: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
};

const COIN_STATUS = {
  UP: 'up',
  DOWN: 'down',
};

const DELIVERY_TYPE = [
  { value: 'TN', title: "Tận nơi" },
  { value: 'TK', title: "Tại kho" },
  { value: "QL", title: "Quốc lộ" },
]

const RECEIVE_TYPE = [
  { value: 'TN', title: "Tận nơi" },
  { value: 'TK', title: "Tại kho" },
]

const PAY_TYPE = [
  { value: "TTS", title: "TTS" },
  { value: "TDN", title: "TĐN" },
  { value: "DTT", title: "ĐTT" },
  { value: "Other", title: "Khác" },
]

const colorStutusOrder = (value) => {
  let color;
  switch (value) {
    case 'New':
      color = "orange";
      break;
    case 'Gone':
      color = "blue";
      break;
    case 'Inventory':
      color = "green";
      break;
    case 'Incurred':
      color = "purple"
    default:
      break;
  }
  return color
}

const titleStutusOrder = (value) => {
  let title;
  switch (value) {
    case 'New':
      title = "Đơn mới";
      break;
    case 'Gone':
      title = "Đơn hàng đã đi";
      break;
    case 'Inventory':
      title = "Đơn hàng tồn kho";
      break;
    case 'Incurred':
      title = "Đơn hàng có phát sinh"
    default:
      break;
  }
  return title
}

const titlePayType = (value) => {
  let title;
  switch (value) {
    case 'DTT':
      title = "ĐTT";
      break;
    case 'TTS':
      title = "TTS";
      break;
    case 'TDN':
      title = "TĐN";
      break;
    default:
      break;
  }
  return title
}


const FORMATS_DATE = {
  DD_MM_YYYY: 'DD/MM/YYYY',
  YYYY_MM_DD: 'YYYY-MM-DDTHH:mm:ssZ',
  DD_MM_YYYY_HH_MM_SS: 'DD/MM/YYYY HH:mm:ss'
};

const PROVINCE = [
  { code: "076", name: "An Giang" },
  { code: "064", name: "Bà Rịa - Vũng Tàug" },
  { code: "781", name: "Bạc Liêu" },
  { code: "281", name: "Bắc Kạn" },
  { code: "240", name: "Bắc Giang" },
  { code: "241", name: "Bắc Ninh" },
  { code: "075", name: "Bến Tre" },
  { code: "650", name: "Bình Dương" },
  { code: "056", name: "Bình Định" },
  { code: "651", name: "Bình Phước" },
  { code: "062", name: "Bình Thuận" },
  { code: "780", name: "Cà Mau" },
  { code: "712", name: "Cần Thơ (TP)" },
  { code: "026", name: "Cao Bằng" },
  { code: "511", name: "Đà Nẵng" },
  { code: "050", name: "Đắk Lắk" },
  { code: "502", name: "Đắk Nông" },
  { code: "090", name: "Điện Biên" },
  { code: "061", name: "Đồng Nai" },
  { code: "067", name: "Đòng Tháp" },
  { code: "059", name: "Gia Lai" },
  { code: "019", name: "Hà Giang" },
  { code: "351", name: "Hà Nam" },
  { code: "004", name: "Hà Nội" },
  { code: "039", name: "Hà Tĩnh" },
  { code: "320", name: "Hải Dương" },
  { code: "031", name: "Hải Phòng" },
  { code: "711", name: "Hậu Giang" },
  { code: "018", name: "Hòa Bình" },
  { code: "008", name: "Hồ Chí Minh" },
  { code: "321", name: "Hưng Yên" },
  { code: "058", name: "Khánh Hòa" },
  { code: "077", name: "Kiên Giang" },
  { code: "060", name: "Kon Tum" },
  { code: "023", name: "Lai Châu" },
  { code: "063", name: "Lâm Đồng" },
  { code: "025", name: "Lạng Sơn" },
  { code: "020", name: "Lào Cai" },
  { code: "072", name: "Long An" },
  { code: "350", name: "Nam Định" },
  { code: "038", name: "Nghệ An" },
  { code: "030", name: "Ninh Bình" },
  { code: "068", name: "Ninh Thuận" },
  { code: "210", name: "Phú Thọ" },
  { code: "057", name: "Phú Yên" },
  { code: "052", name: "Quảng Bình" },
  { code: "510", name: "Quảng Nam" },
  { code: "055", name: "Quảng Ngãi" },
  { code: "033", name: "Quảng Ninh" },
  { code: "053", name: "Quảng Trị" },
  { code: "079", name: "Sóc Trăng" },
  { code: "022", name: "Sơn  La" },
  { code: "066", name: "Tây Ninh" },
  { code: "063", name: "Thái Bình" },
  { code: "280", name: "Thái Nguyên" },
  { code: "037", name: "Thanh Hóa" },
  { code: "054", name: "Thừa Thiên Huế" },
  { code: "073", name: "Tiền Giang" },
  { code: "074", name: "Trà Vinh" },
  { code: "027", name: "Tuyên Quang" },
  { code: "070", name: "Vĩnh Long" },
  { code: "211", name: "	Vĩnh Phúc" },
  { code: "029", name: "Yên Bái" },
]

export {
  REQUEST_TYPE_FORM,
  EVENT_EMITTER_NAMES,
  COOKIE_NAMES,
  LOCAL_STORAGE_NAMES,
  REGEX,
  COIN_STATUS,
  DELIVERY_TYPE,
  RECEIVE_TYPE,
  PAY_TYPE,
  colorStutusOrder,
  titleStutusOrder,
  titlePayType,
  FORMATS_DATE,
  PROVINCE
};
