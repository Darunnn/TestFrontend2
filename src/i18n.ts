import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

interface TranslationKeys {
  formAndTable: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: string;
  gender: string;
  male: string;
  female: string;
  unisex: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
  reset: string;
  submit: string;
  selectAll: string;
  delete: string;
  edit: string;
  manage: string;
  name: string;
  totalItems: string;
}

interface Resources {
  [language: string]: {
    translation: TranslationKeys;
  };
}

const resources: Resources = {
  en: {
    translation: {
      formAndTable: 'Form & Table',
      title: 'Title',
      firstname: 'Firstname',
      lastname: 'Lastname',
      birthday: 'Birthday',
      nationality: 'Nationality',
      citizenId: 'CitizenID',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      unisex: 'Unisex',
      mobilePhone: 'Mobile Phone',
      passportNo: 'Passport No',
      expectedSalary: 'Expected Salary',
      reset: 'RESET',
      submit: 'SUBMIT',
      selectAll: 'Select All',
      delete: 'DELETE',
      edit: 'EDIT',
      manage: 'MANAGE',
      name: 'Name',
      totalItems: 'Total {{total}} items',
    },
  },
  th: {
    translation: {
      formAndTable: 'แบบฟอร์มและตาราง',
      title: 'คำนำหน้า',
      firstname: 'ชื่อ',
      lastname: 'นามสกุล',
      birthday: 'วันเกิด',
      nationality: 'สัญชาติ',
      citizenId: 'เลขบัตรประชาชน',
      gender: 'เพศ',
      male: 'ชาย',
      female: 'หญิง',
      unisex: 'ไม่ระบุ',
      mobilePhone: 'เบอร์โทรศัพท์',
      passportNo: 'เลขที่หนังสือเดินทาง',
      expectedSalary: 'เงินเดือนที่คาดหวัง',
      reset: 'รีเซ็ต',
      submit: 'ส่งข้อมูล',
      selectAll: 'เลือกทั้งหมด',
      delete: 'ลบ',
      edit: 'แก้ไข',
      manage: 'จัดการ',
      name: 'ชื่อ',
      totalItems: 'ทั้งหมด {{total}} รายการ',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: true
    }
  });
export default i18n;