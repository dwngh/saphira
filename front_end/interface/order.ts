export default interface Order {
    // Basic data
    id;
    patientId;
    doctorId;
    description?;
    price;
    status;
    shift;
    date;
    created_at;
    // Some field may be generated to support displaying
    patient?;
    calendar?;
    doctor?;
    attachments?;
}