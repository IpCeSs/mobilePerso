import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CommentsPage } from '../comments/comments';
import { ItemsProvider} from "../../providers/items/items";
import { CommentairesProvider} from "../../providers/commentaires/commentaires";
import { ImagesProvider} from "../../providers/images/images";


import { User} from "../../app/models/User";
import {Image} from "../../app/models/Image";
import { Commentaire} from "../../app/models/Commentaire";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  users: User[];
  images: Image[];
  commentaires: Commentaire[];
  public base64Image: string;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public userService: ItemsProvider,
              public imagesService: ImagesProvider,
              public comService: CommentairesProvider,

  ) {
  }
  like(image){
    image.likeCount ++;
  }
  goToCommentsPage() {
    this.navCtrl.push(CommentsPage);
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    })
      .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {

      this.users = users;

    });
    this.imagesService.getImages().subscribe(images => {

      this.images = images;
    });
    this.comService.getCommentaires().subscribe(commentaires => {

      this.commentaires = commentaires;

    });
  //  this.photoView.show('https://firebasestorage.googleapis.com/v0/b/cafemobile-862b0.appspot.com/o/images%2FUn-Photographe-professionnel-partage-ses-Secrets-pour-capturer-des-Photos-de-Paysage-parfaites-03.jpg?alt=media&token=a6e26c29-7cbb-496f-887e-c2e2b634427e');

  }



}
