import { Component, signal, effect, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
export class App {
  stage = signal(1);
  emoji = signal('😍');

  showContinue = signal(false);
  showFinalVideo = signal(false);

  videoSrc = computed(() => {
    if (this.showFinalVideo()) return 'assets/videoD.mp4';
    const s = this.stage();
    if (s >= 2 && s <= 3) return '/assets/videoA.mp4';
    if (s >= 4 && s <= 5) return 'assets/videoB.mp4';
    if (s >= 6 && s <= 7) return 'assets/videoC.mp4';
    return null;
  });

  // Stage 1
  s1_count = signal(0);
  s1_swapped = signal(false);
  s1_msg = signal("Do you still love me?");

  get s1_btnApply() { return this.s1_swapped() ? 'btn-danger' : 'btn-success'; } // Color of Right button (Visually) or just swap completely
  // Let's model it as Left Button and Right Button
  // Default: Left=No, Right=Yes.
  // Swapped: Left=Yes, Right=No.

  // Actions
  s1_clickLeft() {
    if (this.s1_swapped()) this.s1_yesAction();
    else this.s1_noAction();
  }

  s1_clickRight() {
    if (this.s1_swapped()) this.s1_noAction();
    else this.s1_yesAction();
  }

  s1_yesAction() {
    this.s1_count.update(c => c + 1);
    if (this.s1_count() < 3) {
      this.emoji.set('😢');
      this.s1_swapped.update(v => !v);
    } else {
      this.emoji.set('😎');
      this.s1_msg.set("Tau, saje tanya");
      this.showContinue.set(true);
    }
  }

  s1_noAction() {
    this.emoji.set('😢');
    this.s1_msg.set("Saya cedeyhh");
    // Force swap to confuse? Or just stay.
    this.s1_swapped.update(v => !v);
  }

  // Stage 2
  s2_btnStyle = signal<any>({});
  s2_scale = signal(1);
  s2_msg = signal("Rindu kite tak?");
  s2_done = signal(false);
  s2_count = signal(0);

  s2_over() {
    if (this.s2_done()) return;
    // Stop if too small (give up/allow click)
    if (this.s2_scale() <= 0.2) return;
    this.s2_msg.set(`Tekan ah lek lok. Tu pun tak reti`);

    // Move within relative container using percentages
    const left = Math.floor(Math.random() * 60); // 0% to 80%
    const top = Math.floor(Math.random() * 60);  // 0% to 80%

    // Shrink
    this.s2_scale.update(s => Math.max(0.2, s * 0.85));

    this.s2_btnStyle.set({
      position: 'absolute',
      left: `${left}%`,
      top: `${top}%`,
      transform: `scale(${this.s2_scale()})`,
      transition: 'all 0.2s ease-out',
      zIndex: 10
    });
  }

  s2_yes() {
    this.s2_count.update(c => c + 1);
    if (this.s2_count() < 3) {
      this.s2_msg.set(`Tekan ah lek lok. Tu pun tak reti`);
      this.s2_over();
      return;
    }

    this.emoji.set('😎');
    this.s2_msg.set("Hehe, jangan la keciwi");
    this.showContinue.set(true);
    // Reset style so they can see results/continue, or just hide button?
    // Let's hide the button or reset it.
    this.s2_btnStyle.set({ display: 'none' });
    this.s2_done.set(true);
  }

  // Stage 3
  s3_progress = signal(0);
  s3_started = signal(false);
  s3_showResult = signal(false);

  s3_open() {
    this.s3_started.set(true);
    this.emoji.set('🎁');
    const int = setInterval(() => {
      this.s3_progress.update(p => {
        if (p >= 99) {
          clearInterval(int);
          // Wait 3 seconds
          setTimeout(() => {
            this.emoji.set('🤡');
            this.s3_showResult.set(true);
            this.showContinue.set(true);
          }, 3000);
          return 99;
        }
        return p + 1;
      });
    }, 30);
  }

  // Stage 4
  s4_stars = [1, 2, 3, 4, 5];
  s4_msg = signal("Rate this experience:");
  s4_rating = signal(0); // Added missing signal

  s4_rate() {
    this.emoji.set('😭');
    this.s4_msg.set("1 Star je? Sampai hati");
    this.s4_rating.set(1); // Force 1 star visual
    this.showContinue.set(true);
  }

  // Stage 5
  s5_lines = ["You have a great mustache", "You sleep like a cing congs", "MITSUBISHI !!!!!"];
  s5_idx = signal(0);
  s5_curr = signal("");
  s5_done = signal(false);

  s5_gimme() {
    const i = this.s5_idx();
    if (i < this.s5_lines.length + 1) {
      this.s5_curr.set(this.s5_lines[i]);
      this.s5_idx.update(n => n + 1);
      this.emoji.set('😏');
    }
    if (this.s5_idx() > 3) {
      this.showContinue.set(true);
      this.s5_done.set(true);
    }
  }

  // Stage 6
  s6_msg = signal("Is it peaceful without me?");

  s6_no() {
    this.emoji.set('🤨');
    this.s6_msg.set("BEEP! BEEP! WRONG ANSWER!");
    if (navigator.vibrate) navigator.vibrate(500);
    this.playBeep();
    this.showContinue.set(false);
  }

  playBeep() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      setTimeout(() => osc.stop(), 300);
    } catch (e) {
      console.error(e);
    }
  }

  // Stage 7
  s7_in = signal("");
  s7_locked = signal(false);

  s7_type(e: any) {
    if (this.s7_locked()) return;
    this.s7_in.set(e.target.value);
  }

  s7_enter() {
    if (this.s7_locked()) return;
    this.s7_in.set("Teeettttt, Burgir rashit sedap lagi");
    this.s7_locked.set(true);
    this.emoji.set('🫠');
    setTimeout(() => this.showContinue.set(true), 800);
  }

  // Stage 8
  s8_val = signal(50);
  s8_shake = signal(false);
  s8_done = signal(false);

  s8_slide(e: any) {
    const v = +e.target.value;
    this.s8_val.set(v);
    if (v > 80) {
      this.emoji.set('😱');
      this.s8_shake.set(true);
      setTimeout(() => this.s8_shake.set(false), 500);
    } else if (v < 10) {
      this.s8_done.set(true);
      this.emoji.set('😍');
    } else {
      this.emoji.set('😐');
    }
  }

  final() {
    alert("Selamat hari natal! Eh, Valentine's Day dalam melayu apa eh. Ha apa2 je la, enjoy titik peluh ku dan my wonderful voice in the backgound. VOLUME UP !!! :)");
    this.showFinalVideo.set(true);
  }

  next() {
    this.stage.update(s => s + 1);
    this.reset();
  }

  reset() {
    this.showContinue.set(false);
    this.s4_rating.set(0); // reset rating
    const s = this.stage();
    if (s === 2) this.emoji.set('🤔');
    if (s === 3) this.emoji.set('🎁');
    if (s === 4) this.emoji.set('📊');
    if (s === 5) this.emoji.set('😐');
    if (s === 6) this.emoji.set('🤫');
    if (s === 7) this.emoji.set('🍽️');
    if (s === 8) this.emoji.set('⚖️');
  }
}
