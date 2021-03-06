import { ServicesService, MSubCategories } from './../../services/services.service';
import { MCategoriesService} from './../../services/m_categories/m-categories.service';
import { Component, OnInit } from '@angular/core';
import { CategoryInputPage } from './../category_input/category-input.page';
import { ModalController, ToastController, NavParams, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public obj_MSubCategories : MSubCategories = {
    id: null,
    username: null,
    categories_name: null,
    categories_type: null,
    sub_categories_name: null,
    sub_categories_active: null
  }
  public obj_MSubCategories_Income : Observable<MSubCategories[]>
  public obj_MSubCategories_Expense : Observable<MSubCategories[]>
  public obj_MCategories_Income = []
  public obj_MCategories_Expense = []
  public loading: any = 0;
  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController:ToastController,
    private ServicesService:ServicesService
  ) { 
   this.get_categories()
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loading = true;
  }

  // * @Function   : modal_insert_show => แสดง modal CategoryInputPage
  // * @Author     : Kessarin U-tumporn
  // * @Create Date: 2563-03-01
  async modal_insert_show() {
    const modal = await this.modalController.create({
      component: CategoryInputPage,
      componentProps: {
        'type_input': 'insert'
      }
    });
    return await modal.present();
  }

  // * @Function   : modal_update_show => แสดง modal CategoryInputPage
  // * @Author     : Kessarin U-tumporn
  // * @Create Date: 2563-03-01
  async modal_update_show(id:string) {
    const modal = await this.modalController.create({
      component: CategoryInputPage,
      componentProps: {
        'type_input': 'update',
        'id': id
      }
    });
    return await modal.present();
  }

  // * @Function   : category_active_update_AlertConfirm => แสดง Alert การลบ
  // * @Author     : Kessarin U-tumporn
  // * @Create Date: 2563-03-10
  async category_active_update_AlertConfirm(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.ServicesService.MSubCategoriesService.delete_sub_categories(id)
            this.showToast("Delete Categories Success");
          }
        }
      ]
    });

    await alert.present();
  }

  // * @Function   : get_categories => แสดงข้อมูล categories
  // * @Author     : Kessarin U-tumporn
  // * @Create Date: 2563-03-09
  async get_categories(){
      //get รายรับ
      this.obj_MSubCategories.categories_type = 1;
      this.obj_MSubCategories_Income = this.ServicesService.MSubCategoriesService.get_obs_msubcategories(this.obj_MSubCategories.categories_type)
      this.ServicesService.MCategoriesService.get_obs_mcategories(this.obj_MSubCategories.categories_type).subscribe(res =>{
        this.obj_MCategories_Income = res
      })

      //get รายจ่าย
      this.obj_MSubCategories.categories_type = 2;
      this.obj_MSubCategories_Expense = this.ServicesService.MSubCategoriesService.get_obs_msubcategories(this.obj_MSubCategories.categories_type)
      this.ServicesService.MCategoriesService.get_obs_mcategories(this.obj_MSubCategories.categories_type).subscribe(res =>{
        this.obj_MCategories_Expense = res
      })
  }

  // * @Function   : showToast => คำสั่งแสดงข้อความ
  // * @Author     : Kessarin U-tumporn
  // * @Create Date: 2563-03-09
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  // * @Function   : sortData_obj_MCategories_Income => sort categories income
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-15
  public get sortData_obj_MCategories_Income() {
    return this.obj_MCategories_Income.sort((a, b) => {
      return <any>(a.cat_seq) - <any>(b.cat_seq);
    });
  }

  // * @Function   : sortData_obj_MCategories_Expense => sort categories expense
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-15
  public get sortData_obj_MCategories_Expense() {
    return this.obj_MCategories_Expense.sort((a, b) => {
      return <any>(a.cat_seq) - <any>(b.cat_seq);
    });
  }
 
}