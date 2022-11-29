export default interface Order {
    // Basic data
    id;
    patient_id;
    doctor_id;
    description?;
    price;
    status;
    shift;
    date;
    createdAt;
    // Some field may be generated to support displaying
    patient;
    doctor;
    attachments;
}