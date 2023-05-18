import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { running } from '../models/running';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RunningService {
  // private availableRunnings: running[] = [
  //   {
  //     id: '1',
  //     title: 'Jogging',

  //     duration: 20,
  //     calories: 300,
  //   },
  //   {
  //     id: '2',
  //     title: 'Hiking',

  //     duration: 30,
  //     calories: 100,
  //   },
  //   {
  //     id: '3',
  //     title: 'Hiit',

  //     duration: 40,
  //     calories: 400,
  //   },
  //   {
  //     id: '4',
  //     title: 'Sprint',

  //     duration: 1,
  //     calories: 200,
  //   },
  // ];

  private availableRunnings!: running[];
  public aviliableRunningChange = new Subject<running[]>();

  runningStarted: running | undefined | null;
  public runningChange = new Subject<any>();
  private pastRunning: any[] = [];

  public pastRunningChange = new Subject<any[]>();

  constructor(private db: AngularFirestore) {}

  fetcAviliableRunnings() {
    this.db
      .collection('availableRunnings')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            let item = doc.payload.doc.data() as any;
            return {
              id: doc.payload.doc['id'],
              ...item,
            };
          });
        })
      )
      .subscribe((docItem: running[]) => {
        this.availableRunnings = docItem;
        this.aviliableRunningChange.next([...this.getAvailableRunnings()]);
      });
  }

  fetchHistoryRunnings() {
    const runningId = localStorage.getItem('runnrtAccount');
    this.db
      .collection('historyRunning', (ref) =>
        ref.where('runningId', '==', runningId)
      )
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((array) => {
            let item = array.payload.doc.data() as any;
            return {
              id: array.payload.doc['id'],
              ...item,
            };
          });
        })
      )
      .subscribe((historyItem: running[]) => {
        this.pastRunning = historyItem;
        this.pastRunningChange.next([...this.pastRunning]);
      });
  }

  private runingInDb(running: any) {
    this.db
      .collection('historyRunning')
      .add(running)
      .then((doc) => {
        const docId = doc.id;
        this.db
          .collection('historyRunning')
          .doc(docId)
          .update({
            historyId: docId,
          })
          .catch((e) => {});
      });
  }

  deleteOne(id: string) {
    this.db
      .collection('historyRunning')
      .doc(id)
      .delete()
      .then(() => {
        alert('obrisi');
      })
      .catch((e) => alert('greska'));
  }
  delteallforUser() {
    const runningId = localStorage.getItem('runnrtAccount');
    let runningHistoryQuery = this.db.collection('historyRunning', (ref) =>
      ref.where('runningId', '==', runningId)
    );
    runningHistoryQuery.get().subscribe((docs) => {
      docs.forEach((doc) => {
        doc.ref
          .delete()
          .then(() => {})
          .catch((e) => {
            alert('greska');
          });
      });
    });
  }
  startRun(id: string) {
    this.runningStarted = this.availableRunnings.find((run) => {
      return run.id === id;
    });

    this.runningChange.next(this.runningStarted);
  }
  compliteRun() {
    const runningId = localStorage.getItem('runnrtAccount');
    const runComplited = {
      ...this.runningStarted,
      date: new Date(),
      status: 'complited',
    };
    this.runingInDb(runComplited);
    this.pastRunning.push(runComplited);
    this.runningStarted = null;
    this.runningChange.next(null);
    runningId;
  }

  stopRunning(progress: number) {
    const runningId = localStorage.getItem('runnrtAccount');
    const durationDone = this.runningStarted
      ? this.runningStarted.duration * (progress / 100)
      : 0;

    const caloriesBurn = this.runningStarted
      ? this.runningStarted.calories * durationDone
      : 0;

    const runStopped = {
      ...this.runningStarted,
      date: new Date(),
      duration: durationDone,
      calories: caloriesBurn.toFixed(2),
      status: 'stopped',
      runningId,
    };
    this.pastRunning.push(runStopped);
    this.runingInDb(runStopped);
    this.runningStarted = null;
    this.runningChange.next(null);
  }

  getRunningStarted(): any {
    return { ...this.runningStarted };
  }

  getAvailableRunnings(): running[] {
    return [...this.availableRunnings];
  }

  getHistoryRunning() {
    return [...this.pastRunning];
  }
}
