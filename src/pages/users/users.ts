import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GithubUsersProvider} from '../../providers/github-users/github-users' //add provider
import { LoadingController } from 'ionic-angular'; // add loader

/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
  providers: [GithubUsersProvider] //add provider
})
export class UsersPage {

  public users:any;   //define variable

  constructor(public navCtrl: NavController, public navParams: NavParams, public githubUsers: GithubUsersProvider, public loading: LoadingController) {
      this.getUsersList(); //call function
      this.ionViewLoaded(); // call function
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }



  //custom function for api get
  getUsersList() {
  this.githubUsers.getUsers()
  .then(data => {
    this.users = data;
  });
}

  //custom function for loader
ionViewLoaded() {
  let loader = this.loading.create({
    content: 'Loading',
  });

  loader.present().then(() => {
    this.githubUsers.getUsers()
      .then(data => {
        this.users = data;
      });
    loader.dismiss();
  });
}

}
