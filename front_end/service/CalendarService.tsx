import axios from "axios";
import { UserService } from "./UserService";

export default function CalendarService() {
    const createCalendar = async (user, token) => {
        const payload = {
            doctorId: user.id,
        }
        let response;
        await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_HOST}/calendars`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            data: payload
        })
            .then((res) => {
                console.log("Create calendar successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        console.log("New calendar");
        console.log(response);
        const { updateUser } = UserService();
        if (response) {
            console.log('Have response');
            user.calendarId = response.id;
            delete user.speciality;
            delete user.hospital;
            delete user.calendar;
            let r = await updateUser(user, token);
            return response;
        } else {
            // deleteCalendar(response.id, token);
            return null;
        }
    }

    const deleteCalendar = async(id, token) => {
        let response;
        await axios({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_HOST}/calendars/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Delete calendar successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    const updateCalendar = async(payload, token) => {
        let response;

        await axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_HOST}/calendars`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            data: payload
        })
            .then((res) => {
                console.log("Update calendar successfully ...");
                response = res.data;
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        return response;
    }

    return { createCalendar, deleteCalendar, updateCalendar }
} 