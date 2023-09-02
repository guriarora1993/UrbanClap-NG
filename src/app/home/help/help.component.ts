import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {
  public dataPassToContainer: any = null;
  public navigate: boolean = false;
  public caseDetailData: any;
  public navigateToCaseDetail: boolean = false;
  optionList = [
    {
      svg: 'M16.026 14.727a7 7 0 10-8.051 0 11.5 11.5 0 00-5.936 5.022l1.732 1A9.504 9.504 0 0112 16a9.504 9.504 0 018.229 4.75l1.732-1a11.504 11.504 0 00-5.935-5.023zM7 9a5 5 0 115 5 5 5 0 01-5-5z',
      title: 'Account',
    },
    {
      svg: 'M9.024 8.332a4.225 4.225 0 116.046 0 6.647 6.647 0 012.732 2.595l.042.073h1.54c.344 0 .714.097 1.024.322.315.23.592.62.592 1.126v7.16c0 .506-.277.896-.592 1.126-.31.225-.68.322-1.023.322H14.46c-.473 0-.885.139-1.152.333-.262.19-.309.369-.309.457v1h-2v-1c0-.088-.047-.266-.31-.457-.266-.194-.678-.333-1.152-.333H4.615c-.343 0-.713-.097-1.023-.322A1.395 1.395 0 013 19.608v-7.16c0-.506.277-.896.592-1.126.31-.225.68-.322 1.023-.322H6.25l.043-.074a6.647 6.647 0 012.732-2.594zm.797-2.953a2.225 2.225 0 112.24 2.226H12.033a2.225 2.225 0 01-2.21-2.226zM8.727 11h.811c.833 0 1.673.238 2.33.716.044.033.089.067.132.102.043-.035.088-.07.133-.102.656-.478 1.496-.716 2.329-.716h.904a4.643 4.643 0 00-3.302-1.395h-.035A4.647 4.647 0 008.727 11zM13 13.79v5.522a4.24 4.24 0 011.461-.256H19V13h-4.539c-.473 0-.885.139-1.152.333-.262.19-.309.369-.309.457zm-2 0c0-.088-.047-.266-.31-.457-.266-.194-.678-.333-1.152-.333H5v6.056h4.538c.499 0 1 .085 1.462.256V13.79z',
      title: 'Getting started with UC',
    },
    {
      svg: 'M12 8a4 4 0 100 8 4 4 0 000-8zm-2 4a2 2 0 114 0 2 2 0 01-4 0z',
      title: 'Payments & UC Credits',
    },
    {
      svg: 'M17.9 12l-5.657-5.657L6.586 12l5.657 5.657L17.899 12zm-5.657 2.828L9.414 12l2.829-2.828L15.07 12l-2.828 2.828z',
      title: 'UC Plus Membership',
    },
    {
      svg: 'M16.36 7.232L11 11.698 8.64 9.732l-1.28 1.536 3 2.5a1 1 0 001.28 0l6-5-1.28-1.536z',
      title: 'UC Safety',
    },
    {
      svg: 'M7 12.285c-1.283-.488-5-2.318-5-7.11V1.666h10v3.507c0 4.793-3.717 6.623-5 7.11zm.177 1.352c1.024-.342 6.156-2.363 6.156-8.463V.914a.583.583 0 00-.168-.41.573.573 0 00-.408-.17H1.242c-.152 0-.299.061-.407.17a.583.583 0 00-.168.41v4.26c0 6.1 5.131 8.12 6.156 8.463.115.04.24.04.354 0zm-3.51-7.303a3.333 3.333 0 016.666 0H7.5v1.667a.5.5 0 001 0v-.334h1v.334a1.5 1.5 0 01-3 0V6.334H3.667z',
      title: 'Warranty',
    },
  ];

  public accountCase = [
    {
      sectionHeading: 'Account',
      questionsList: [
        'I want to change my phone number',
        'Where can I check my saved addresses?',
        'I want to change my email address',
        'Where can I see my payment deatils? ',
      ],
    },
  ];

  public paymentsCredits = [
    {
      sectionHeading: 'Payment & UC Credits',
      questionsList: [
        'I am unable to make payment',
        'How do I check my wallet balance?',
        'How do I use my UC credits?',
        'Can I extend the validity of the rewards?',
        'How does refferal work?',
        'I have not recieved a reward for referral',
        'Where can I see my saved payment details?',
      ],
    },
  ];

  public getStarted = [
    {
      sectionHeading: 'Getting started with UC',
      subHeading: 'About us',
      questionsList: [
        'What is Urban Company?',
      ],
    },
    {
      subHeading: 'Bookings',
      questionsList: [
        'How to place a booking?',
        'Can I re-book the same professional if I like their service?',
        'How to book my preferred professional?',
        'Do I have to order a minimum value of service before I can place the booking?',
        'Does Urban Company charge any cancellation fee?'
      ],
    },
  ];

  public ucMembership = [
    {
      sectionHeading: 'UC Plus membership',
      subHeading: 'Purchase',
      questionsList: [
        'What are the benefits of the membership?',
        'What is the maximum discount that I can get by using UC Plus?',
        'How does the 100% money-back guarantee work?',
        'How do I buy the membership?',
        'Can I Pay for membership with cash on delivery?',
        'Can I share membership with family?',
      ],
    },
    {
      subHeading: 'Modification',
      questionsList: [
        'How do I cancel my membership plan?',
        'Can I pause my membership?',
      ],
    },
  ];

  public warranty = [
    {
      sectionHeading: 'Warranty',
      questionsList: [
        'Which services are covered under UC warranty?',
        'Do I have to pay for the service under warranty?',
      ],
    },
  ];

  public ucSafety = [
    {
      sectionHeading:"Know more about Urban Company's safety measures",
      sectionInfo: "At Urban Company, the safety of the customers and professionals is taken exteremly seriously. To ensure this,we have taken the following precautionary measures: ",
      points: ['We conduct background verification on all our professionals', 'In case of any critical support, SOS button is available in app for both our customers and professionals']
    }
  ]

  public openListOptions(index: number) {
    if (index == 0) {
      this.dataPassToContainer = this.accountCase;
      this.navigate = true;
    } else if (index == 1){
      this.dataPassToContainer = this.getStarted
      this.navigate = true;
    }else if (index == 2) {
      this.dataPassToContainer = this.paymentsCredits;
      this.navigate = true;
    } else if (index == 3){
      this.dataPassToContainer = this.ucMembership
      this.navigate = true;
    } else if (index == 4){
      this.caseDetailData = this.ucSafety
      this.navigate = true
      this.navigateToCaseDetail = true
    } else if(index == 5){
      this.dataPassToContainer = this.warranty
      this.navigate = true;
    }
  }

  public toggleBooleanValue() {
    this.navigate = !this.navigate;
    this.navigateToCaseDetail = !this.navigateToCaseDetail;
    this.dataPassToContainer = ""
    this.caseDetailData = "" /* Issue there for show data */
  }
}
