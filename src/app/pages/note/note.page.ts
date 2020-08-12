import { NoteService } from "./../../services/note.service";
import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-note",
  templateUrl: "./note.page.html",
  styleUrls: ["./note.page.scss"],
})
export class NotePage implements OnInit {
  constructor(
    public noteService: NoteService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.noteService.load();
  }

  addNote() {
    this.alertCtrl
      .create({
        header: "New Note",
        message: "What should the title of this note be?",
        inputs: [
          {
            type: "text",
            name: "title",
          },
        ],
        buttons: [
          {
            text: "Cancel",
          },
          {
            text: "Save",
            handler: (data) => {
              this.noteService.createNote(data.title);
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
