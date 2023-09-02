import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent {
  @Input() optionsList: any[];
  @Output() toggleParentBoolean = new EventEmitter<void>();
  public sectionHeading: string;
  public sectionHeadingExist: boolean = false;
  public updatedProfile: boolean = false;
  public updatedProfileData: any;
  public navigateToCaseDetail: boolean = false;
  public caseDetailData: any;
  ngOnInit(): void {
    if (this.optionsList != null) {
      this.sectionHeading = this?.optionsList[0].sectionHeading || '';
    } else {
      console.log('cases section data is not exist');
      this.sectionHeadingExist = true;
    }
  }

  public loginCred = [
    {
      sectionHeading: 'I want to change my phone number',
      sectionTitle:
        'You can change your phone number from the profile section after verifying it with an OTP',
      buttonText: 'Change phone number',
    },
  ];

  public emailCred = [
    {
      sectionHeading: 'I want to change my email address?',
      sectionTitle:
        'You can change your email address from the profile section after verifying with an OTP',
      buttonText: 'Change email address',
    },
  ];

  public paymentCred = [
    {
      sectionHeading: 'Where can I see my saved payment details?',
      sectionTitle:
        'You can check all your saved payment details by clicking the below button, If you wish to remove any saved payment details, you can either unlink wallet  account or delete  the saved cards.',
      buttonText: 'Check saved payments',
    },
  ];

  public aboutUrban = [
    {
      sectionHeading: 'What is Urban Company?',
      sectionInfo:
        "Urban Company(formerly UrbanClap) is Asia's largest online home service marketplace. It was started in 2014 by Abhiraj Singh Bhai, Varun khaitan and Raghav Chandra. We currently operate in multiple cities in Australia, India, Singapore, Saudi Arabia and UAE.",
      points: [],
    },
  ];

  public booking = [
    {
      sectionHeading: 'How to place a booking?',
      sectionInfo:
        'You can follow the steps below to book a service on our app:',
      points: [],
    },
  ];

  public reBooking = [
    {
      sectionHeading:
        'Can I re-book the same professional if I like their service?',
      sectionInfo:
        'Yes, If you rate their service with five starts, you will get an option to re-book with the same professional the next time you book. Click on their profile and secure their slots.',
      points: [],
    },
  ];

  public doMinimun = [
    {
      sectionHeading:
        'Do I have to order a minimum value of services before I can place the...',
      sectionInfo:
        "To ensure efficient use of our professional's time, there are minimum order requirements for each category. If the services you've selected does not meet the minimum order requirement you will be prompted to add more services before you can proceed to checkout.",
      points: [],
    },
  ];

  public cancellation = [
    {
      sectionHeading: 'Does Urban Company charge any cancellation fee?',
      sectionInfo:
        'Cancellation fee is charged only if a professional is assigned on your booking and the time of cancellation is closer to your booking time. This is done to fairly compensate our professionals for their time and the cost of travel while travelling to your place.Exact cancellation amount will be shown while you proceed with a cancellation request.',
      points: [],
    },
  ];

  public prefereedProf = [
    {
      sectionHeading: 'How to book my preferred professional?',
      sectionInfo:
        'If you have already taken the service & rated the professional above 4 stars, You can book your preferred professional by: If the slots of your preferred of your preferred professional are not available?',
      points: [],
    },
  ];

  public unableToPayment = [
    {
      sectionHeading: 'I am unable to make payment',
      sectionInfo:
        'Note: Simpl and Lazypay are temporarily facing high error rates. We request  you to use a different payment method for now , Our team is working to fix this. If you are not able to compelete payment, please try the following steps: ',
      points: [
        "Select a different payment mode than the one you're trying with (e.g try using your debit card instead of UPI)",
        "If switching payment mode doesn't work - then select ''Pay Online after service'' or ''Pay with cash after service''.In case paying online, you will be able to pick a mode of your choice after the service ends",
        'If multiple payment options are falling or pay after service is not available - please wait for some time and try placing the booking again.',
      ],
    },
  ];

  public walletBalance = [
    {
      sectionHeading: 'How do I check my wallet balance?',
      sectionTitle:
        'You can check you wallet balance from your profile section-> My wallet. To check you wallet history: ',
      buttonText: 'Go to wallet',
    },
  ];

  public ucCredits = [
    {
      sectionHeading: 'How do I use my UC credits',
      sectionTitle:
        'Usage of UC credits applies to specific services, For more details, you may check by accessing our mobile app > profile > my wallet, Activate the usage of your credits at the cart summary page before checking out!',
      buttonText: 'Go to wallet',
    },
  ];

  public rewardValidity = [
    {
      sectionHeading: 'Can I extend the validity of the rewards',
      sectionTitle:
        'No, the validity of the rewards or UC credits cannot be extended. Please use the credits before their validity expire. To check the validity of your rewards',
      buttonText: 'Go to wallet',
    },
  ];

  public referralWork = [
    {
      sectionHeading: 'How does referral work?',
      sectionInfo:
        'To be eligible for the referral reward, you have to fulfill the below requirements: ',
      points: [
        'Your friend must be a first-time user of Urabn Company',
        'Download our mobile app and register via your referral link',
        'Account details must have a verfied mobile number',
      ],
    },
  ];

  public referralReward = [
    {
      sectionHeading: 'I have not received the reward for referral',
      sectionInfo: 'You are eligible for referral reward when: ',
      points: [
        'Your referral is first-time user on Urban Company app',
        'They have successfully availed at least 1 service from us',
      ],
    },
  ];

  public savedPayments = [
    {
      sectionHeading: 'Where can I see my saved payment details?',
      sectionTitle:
        'You can check all your saved payment details by clicking the below button. If you wish to remove any saved payment details, you can either unlink wallet account or delete the saved cards.',
      buttonText: 'Check saved payments',
    },
  ];

  public back() {
    this.toggleParentBoolean.emit();
  }

  public openQuestion(index: number, sectionId: any, questionId: any) {
    if (index == 0 && sectionId == 'Account') {
      this.updatedProfileData = this.loginCred;
      this.updatedProfile = true;
    } else if (index == 2 && sectionId == 'Account') {
      this.updatedProfileData = this.emailCred;
      this.updatedProfile = true;
    } else if (index == 3 && sectionId == 'Account') {
      this.updatedProfileData = this.paymentCred;
      this.updatedProfile = true;
    } else if (
      index == 0 &&
      sectionId == 'Getting started with UC' &&
      questionId == 'About us'
    ) {
      this.updatedProfile = true;
      this.caseDetailData = this.aboutUrban;
      this.navigateToCaseDetail = true;
    } else if (
      index == 0 &&
      sectionId == 'Getting started with UC' &&
      questionId == 'Bookings'
    ) {
      this.updatedProfile = true;
      this.caseDetailData = this.booking;
      this.navigateToCaseDetail = true;
    } else if (index == 1 && sectionId == 'Getting started with UC') {
      this.updatedProfile = true;
      this.caseDetailData = this.reBooking;
      this.navigateToCaseDetail = true;
    } else if (index == 2 && sectionId == 'Getting started with UC') {
      this.updatedProfile = true;
      this.caseDetailData = this.prefereedProf;
      this.navigateToCaseDetail = true;
    } else if (index == 3 && sectionId == 'Getting started with UC') {
      this.updatedProfile = true;
      this.caseDetailData = this.doMinimun;
      this.navigateToCaseDetail = true;
    } else if (index == 4 && sectionId == 'Getting started with UC') {
      this.updatedProfile = true;
      this.caseDetailData = this.cancellation;
      this.navigateToCaseDetail = true;
    } else if (index == 0 && sectionId == 'Payment & UC Credits') {
      this.updatedProfile = true;
      this.caseDetailData = this.unableToPayment;
      this.navigateToCaseDetail = true;
    } else if (index == 1 && sectionId == 'Payment & UC Credits') {
      this.updatedProfileData = this.walletBalance;
      this.updatedProfile = true;
    } else if (index == 2 && sectionId == 'Payment & UC Credits') {
      this.updatedProfileData = this.ucCredits;
      this.updatedProfile = true;
    } else if (index == 3 && sectionId == 'Payment & UC Credits') {
      this.updatedProfileData = this.rewardValidity;
      this.updatedProfile = true;
    } else if (index == 4 && sectionId == 'Payment & UC Credits') {
      this.updatedProfile = true;
      this.caseDetailData = this.referralWork;
      this.navigateToCaseDetail = true;
    } else if (index == 5 && sectionId == 'Payment & UC Credits') {
      this.updatedProfile = true;
      this.caseDetailData = this.referralReward;
      this.navigateToCaseDetail = true;
    } else if (index == 6 && sectionId == 'Payment & UC Credits') {
      this.updatedProfileData = this.savedPayments;
      this.updatedProfile = true;
    }
  }

  public changeBooleanVal() {
    this.updatedProfile = !this.updatedProfile;
  }

  public toggleBooleanValue() {
    this.updatedProfile = !this.updatedProfile;
    this.navigateToCaseDetail = !this.navigateToCaseDetail;
  }
}
