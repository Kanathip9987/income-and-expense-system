import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../services/session/session.service';
import { ModalController, AlertController } from '@ionic/angular';
import { TransferInputPage } from '../pages/transfer_input/transfer-input.page';
@Component({
  selector: 'app-tab-account',
  templateUrl: 'tab-account.page.html',
  styleUrls: ['tab-account.page.scss']
})
export class TabAccountPage {

  constructor(
    private SessionService:SessionService,
    private router:Router,
    private modalController: ModalController,
    private alertController: AlertController,) {
      
    }

  // * @Function   : redirect_signin => ไปหน้า wallet
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  redirect_wallet(){
    this.router.navigateByUrl('wallet');
  }

  // * @Function   : redirect_category => ไปหน้า category
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  redirect_category(){
    this.router.navigateByUrl('category');
  }

// * @Function   : logout => ออกจากระบบ
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-02
  logout(){
    this.SessionService.set_session(null,null)
    this.router.navigateByUrl('signin');
  }

   // * @Function   : modal_transfer_input_show => แสดง Modal TransferInputPage และ ตอนปิด Modal จะ Passing Data กลับมา
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async modal_transfer_input_show() { 
    const modal = await this.modalController.create({
      component: TransferInputPage,
      componentProps: {
        'type_input': 'transfer'
      }
    });
    modal.onDidDismiss()
    .then((data) => {
     
    });
    return await modal.present();
  }
}
