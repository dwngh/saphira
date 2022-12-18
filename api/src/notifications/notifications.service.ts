import { Injectable } from '@nestjs/common';
import { Notification } from './notification.entity';
import { UpdateResult, DeleteResult, Repository } from  'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification) 
        private readonly notisRepo: Repository<Notification>,
    ) {}

    async findAll(): Promise<Notification[]> {
        return await this.notisRepo.find();
    }

    async findOne(_id): Promise<Notification> {
        return await this.notisRepo.findOneBy({id:_id});
    }

    async readAllNotifications(_userid): Promise<UpdateResult> {
        return await this.notisRepo.createQueryBuilder()
            .update(Notification)
            .set({read: true})
            .where("Notification.userId = :id", {id: _userid})
            .execute();
    }

    async readANotification(noticeId): Promise<UpdateResult> {
        return await this.notisRepo.createQueryBuilder()
            .update(Notification)
            .set({read: true})
            .where("Notification.id = :id", {id: noticeId})
            .execute();
    }

    async noticeUpdateNote(orderId, userid): Promise<Notification>{
        let notice = new Notification;
        notice.url = "/patient/orders?note=" + orderId;
        notice.content = "Bác sĩ đã thay đổi ghi chú ở đơn đặt khám của bạn. Vui lòng kiểm tra!";
        notice.userId = userid;
        return await this.notisRepo.save(notice);
    }

    async doneStatusUpdate(orderId, userid): Promise<Notification>{
        let notice = new Notification;
        console.log("Doneeee!!");
        notice.url = "/patient/orders?order=" + orderId;
        notice.content = "Bác sĩ đã thay đổi trạng thái yêu cầu thành đã khám. Vui lòng kiểm tra!";
        notice.userId = userid;
        let a = await this.notisRepo.save(notice);
        console.log(a);
        return a;
    }

    async lateStatusUpdate(orderId, userid): Promise<Notification>{
        let notice = new Notification;
        notice.url = "/patient/orders?order=" + orderId;
        notice.content = "Yêu cầu của bạn vừa bị thay đổi trạng thái thành muộn. Vui lòng kiểm tra lại!";
        notice.userId = userid;
        return await this.notisRepo.save(notice);
    }

    async getAllNotificationsOfUser(_userId): Promise<Notification[]> {
        const notis = this.notisRepo.createQueryBuilder("notification")
            .leftJoin("notification.user", "user")
            .select(["notification", "user.id", "user.name", "user.username"])
            .where("user.id=:id", {id: _userId})
            .getMany();
        return notis;
    }

    async update(notification: Notification): Promise<UpdateResult> {
        return await this.notisRepo.update(notification.id, notification)
    }

    async delete(id): Promise<DeleteResult> {
        return await this.notisRepo.delete(id);
    }
}
