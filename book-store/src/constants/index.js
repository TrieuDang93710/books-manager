import { bell, cart, user } from "../assets/icons";
import { Bell, ShoppingCart, User } from "react-feather";

export const navLinks = [
  {
    id: "notification",
    title: "Thông báo",
    iconActive: bell,
    icon: <Bell size={20} />,
  },
  {
    id: "cart",
    title: "Giỏ hàng",
    iconActive: cart,
    icon: <ShoppingCart size={20} />,
  },
  {
    id: "account",
    title: "Tài khoản",
    iconActive: user,
    icon: <User size={20} />,
  },
];

export const slides = [
  {
    id: "slide-1",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/NewBooksYearT124_Banner_resize_Slide_840x320.jpg",
  },
  {
    id: "slide-2",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/NCCAZ_T123_Slide_840x320.jpg",
  },
  {
    id: "slide-3",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/TrangDoChoiT124_Slide_840x320_Thang1.jpg",
  },
  {
    id: "slide-4",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/VPP_Slide_T1_840x320.jpg",
  },
  {
    id: "slide-5",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/NCCNhaNamT123_Slide_840x320.jpg",
  },
  {
    id: "slide-6",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/PopmartT124_Banner_Slide_840x320.jpg",
  },
  {
    id: "slide-7",
    img: "https://cdn0.fahasa.com/media/magentothem/banner7/Cardgame_Slide_T1_840x320.jpg",
  },
];

export const banner = [
  {
    id: "slide-7",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/NCCAlphaT123_Small_310x210.jpg",
  },
  {
    id: "slide-7",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/ForeignBooks_SmallBannerT1_310x210.png",
  },
  {
    id: "slide-7",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/TrangTetT1223_SmallBanner_310x210_1.jpg",
  },
  {
    id: "slide-7",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/MuKi_310_210.png",
  },
];

export const iconMenu = [
  {
    id: "iconMenu-1",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/IconTet_120x120_1.png",
    title: "Tết",
  },
  {
    id: "iconMenu-2",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-12-2023/Icon_NewBookNewYear.png",
    title: "New Book New Year",
  },
  {
    id: "iconMenu-3",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/IconT1_NCC_NhaNam.png",
    title: "Nhã Nam",
  },
  {
    id: "iconMenu-4",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/IconT1_NCC_Alphabook_1.png",
    title: "Alpha Books",
  },
  {
    id: "iconMenu-5",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/Icon_MangaT11_120x120_3.png",
    title: "Manga",
  },
  {
    id: "iconMenu-6",
    img: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png",
    title: "Flash Sale",
  },
  {
    id: "iconMenu-7",
    img: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png",
    title: "Mã Giảm Giá",
  },
  {
    id: "iconMenu-8",
    img: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/IconDoChoi_Thuong_120x120.png",
    title: "Đồ Chơi",
  },
  {
    id: "iconMenu-9",
    img: "https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/ChoDoCu.png",
    title: "Phiên Chợ Đồ Cũ",
  },
  {
    id: "iconMenu-10",
    img: "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png",
    title: "Sản Phẩm Mới",
  },
];

// constants/index.js

export const paymentMethods = [
  { value: 'zaloPay', label: 'Ví ZaloPay', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayapp.svg?q=10462' },
  { value: 'vnPay', label: 'VNPAY', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10462' },
  { value: 'shopeePay', label: 'Ví ShopeePay', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_airpay.svg?q=10462' },
  { value: 'momo', label: 'Ví Momo', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10462' },
  { value: 'atmInternetBanking', label: 'ATM / Internet Banking', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopayatm.svg?q=10462' },
  { value: 'visaMasterJcb', label: 'Visa / Master / JCB', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopaycc.svg?q=10462' },
  { value: 'cashOnDelivery', label: 'Thanh toán bằng tiền mặt khi nhận hàng', image: 'https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10462' },
  // Thêm các phương thức thanh toán khác
];

export const countries = [
  {
    name: 'Việt Nam',
    provinces: [
      {
        name: 'Hồ Chí Minh',
        districts: [
          {
            name: 'Quận 1',
            wards: ['Phường Bến Thành', 'Phường Cầu Kho', '...'],
          },
          {
            name: 'Quận 2',
            wards: ['Phường Thảo Điền', 'Phường An Phú', '...'],
          },
          // Thêm các quận và phường khác
        ],
      },
      {
        name: 'Hà Nội',
        districts: [
          {
            name: 'Quận Hoàn Kiếm',
            wards: ['Phường Hàng Trống', 'Phường Hàng Mã', '...'],
          },
          {
            name: 'Quận Ba Đình',
            wards: ['Phường Trúc Bạch', 'Phường Quán Thánh', '...'],
          },
        ],
      },
    ],
  },
  {
    name: 'United Kingdom',
    provinces: [
      {
        name: 'London',
        districts: [
          {
            name: 'City of London',
            wards: ['Aldersgate', 'Aldgate', '...'],
          },
          {
            name: 'Westminster',
            wards: ['Belgravia', 'Pimlico', '...'],
          },
        ],
      },
      {
        name: 'Manchester',
        districts: [
          {
            name: 'City Centre',
            wards: ['Piccadilly', 'Deansgate', '...'],
          },
          {
            name: 'Salford',
            wards: ['MediaCityUK', 'Eccles', '...'],
          },
        ],
      },
    ],
  },
  {
    name: 'United States',
    provinces: [
      {
        name: 'New York',
        districts: [
          {
            name: 'Manhattan',
            wards: ['Upper East Side', 'Midtown', '...'],
          },
          {
            name: 'Brooklyn',
            wards: ['Williamsburg', 'Downtown Brooklyn', '...'],
          },
        ],
      },
      {
        name: 'California',
        districts: [
          {
            name: 'Los Angeles',
            wards: ['Hollywood', 'Santa Monica', '...'],
          },
          {
            name: 'San Francisco',
            wards: ['Chinatown', 'Nob Hill', '...'],
          },
        ],
      },
    ],
  },
];





// export const feedback = [
//   {
//     id: "feedback-1",
//     content:
//       "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
//     name: "Herman Jensen",
//     title: "Founder & Leader",
//     img: people01,
//   },
//   {
//     id: "feedback-2",
//     content:
//       "Money makes your life easier. If you're lucky to have it, you're lucky.",
//     name: "Steve Mark",
//     title: "Founder & Leader",
//     img: people02,
//   },
//   {
//     id: "feedback-3",
//     content:
//       "It is usually people in the money business, finance, and international trade that are really rich.",
//     name: "Kenn Gallagher",
//     title: "Founder & Leader",
//     img: people03,
//   },
// ];

// export const stats = [
//   {
//     id: "stats-1",
//     title: "User Active",
//     value: "3800+",
//   },
//   {
//     id: "stats-2",
//     title: "Trusted by Company",
//     value: "230+",
//   },
//   {
//     id: "stats-3",
//     title: "Transaction",
//     value: "$230M+",
//   },
// ];

// export const footerLinks = [
//   {
//     title: "Useful Links",
//     links: [
//       {
//         name: "Content",
//         link: "https://www.hoobank.com/content/",
//       },
//       {
//         name: "How it Works",
//         link: "https://www.hoobank.com/how-it-works/",
//       },
//       {
//         name: "Create",
//         link: "https://www.hoobank.com/create/",
//       },
//       {
//         name: "Explore",
//         link: "https://www.hoobank.com/explore/",
//       },
//       {
//         name: "Terms & Services",
//         link: "https://www.hoobank.com/terms-and-services/",
//       },
//     ],
//   },
//   {
//     title: "Community",
//     links: [
//       {
//         name: "Help Center",
//         link: "https://www.hoobank.com/help-center/",
//       },
//       {
//         name: "Partners",
//         link: "https://www.hoobank.com/partners/",
//       },
//       {
//         name: "Suggestions",
//         link: "https://www.hoobank.com/suggestions/",
//       },
//       {
//         name: "Blog",
//         link: "https://www.hoobank.com/blog/",
//       },
//       {
//         name: "Newsletters",
//         link: "https://www.hoobank.com/newsletters/",
//       },
//     ],
//   },
//   {
//     title: "Partner",
//     links: [
//       {
//         name: "Our Partner",
//         link: "https://www.hoobank.com/our-partner/",
//       },
//       {
//         name: "Become a Partner",
//         link: "https://www.hoobank.com/become-a-partner/",
//       },
//     ],
//   },
// ];

// export const socialMedia = [
//   {
//     id: "social-media-1",
//     icon: instagram,
//     link: "https://www.instagram.com/",
//   },
//   {
//     id: "social-media-2",
//     icon: facebook,
//     link: "https://www.facebook.com/",
//   },
//   {
//     id: "social-media-3",
//     icon: twitter,
//     link: "https://www.twitter.com/",
//   },
//   {
//     id: "social-media-4",
//     icon: linkedin,
//     link: "https://www.linkedin.com/",
//   },
// ];

// export const clients = [
//   {
//     id: "client-1",
//     logo: airbnb,
//   },
//   {
//     id: "client-2",
//     logo: binance,
//   },
//   {
//     id: "client-3",
//     logo: coinbase,
//   },
//   {
//     id: "client-4",
//     logo: dropbox,
//   },
// ];
