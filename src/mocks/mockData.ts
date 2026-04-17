/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, UserStatus, Conversation, Message, FriendRequest, ChatMedia } from '../types/types';

export const currentUser: User = {
  id: 'me',
  name: 'Trinh Duy',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zOky6dZAt1p9Dqvv9F8zSwvdct_BPRtT3G1Hg-4nvkrNdjl5dwT3R0uQ4QCc9ybZflL73R51Z9dy2phuXZaZ59rQBySxCS7DKbP_2Xfx0KPYrHVilmD07nMYOTOBTPHnlyfgf4mQ5jtaJ1S35kUCq4SBJtv0EAWqDjfZJjQ3YPzFu8Pk_W1ClyUdjBzl5JM_xmCfb3EsN7c1bgIJ5gwew3Ttp6_o9MD7xkI8uIC7xKHm4aiJDS_bLaBu0FwwYFSmOyxmGmqw7HJH',
  status: UserStatus.ONLINE,
  bio: 'Senior React Developer',
  phone: '0123456789',
};

export const mockUsers: User[] = [
  {
    id: 'alex',
    name: 'Alexander Jameson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBinnBqLIb2o1BpWxYwy74IJsITM0_byrQnEVziSkykhYw3EX0g587sFTf_UfkgATZazDhzjZzk6Y29EXZTwUamWsS3Rm_P0uF8FN3HOHk8lSuo6S6_b4Vlks6tEfeNp3rtTg2W9yvs_RkFyID_T_M9OxF1Uqz7wS38LRvnalPR7ee9Uos2LdqHtqaMyTnPv-pantefwra60KJeGvjeqtWsZcMt5Wf6eSK_UiuRFk27oSDxS_-eq38Vxo7s91OBrfJYIzaJ76FNE7hQ',
    status: UserStatus.ONLINE,
  },
  {
    id: 'travis',
    name: 'Travis Barker',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8bZxRdIH0wn1SO2ct1qgLEb3Qwov_DAIl4adxxS_NUSJvuENKvTHKYfGfKsjkhHg-Q1JMbduYIdLrqd8s9w_KcuHJua-hrkscJldl4kHsg9_DOwZ2r7WfZkXXkTwt2RnrQh1sKLJKLDaJTrUttsGAq2E6zJutKERWPkcV7FgkMWXu_hLKsaCwKdd9zgVrJIA03ikYVM5n49-G2SmciQoBIW7LR-l02sz3N1oH2Fd06huS27qExY333GzQCnqPttrkRS2HP_3PnTxM',
    status: UserStatus.OFFLINE,
  },
  {
    id: 'kate',
    name: 'Kate Rose',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjCwR22KII3wdOMoeInflo1b5eITPpP6JPZA-UB8uALPbyt7t-AFQ7EfViYlGDRUcAZ4TtyXAtjmRmjhwRD7wNb8Zz7txMJzLryfZH9_mMGgmscUo_4tzLXQMr2GE2SxTSLj5a1mfpJ7R2U8mgdfRl8yNXX-6lvMDUokoCBvE4pYbJqKy-o6m0FK7xtc8vpFraMUuDG6azRFq8wDQ_riA_eg7vnZKZ6C5uoRqQahWZTlvs2wYi_-lVAfT_P2ROkphx-zMO2jtRpiB_',
    status: UserStatus.ONLINE,
  },
  {
    id: 'john',
    name: 'John Doe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzudco_fYOwGordd5Ql3vjwYm5yoQAi-zgzPnr8Vy3GsR-imsqeet9llwQbM3nMG1Tj-JA_W-giRQTXE0DGYWCmz2Xw063q4ZZOy6BG8di1X-FqFk6fQiiewmDDAlwg3vT2G18FgMgObWSqkhoQi-fiSsiYkhYoQHNv3D2fCpOIBFfsfrlB17PeDdHAnH8Eni9hqmDxnEB0lFTKuVbSIiq9hlIOxLOpNg6W8lkNhsnGF11P_3aZE0jHFtHPFYL5VSAEdtjTpCLFn0C',
    status: UserStatus.ONLINE,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'my-cloud',
    name: 'Cloud của tôi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zOky6dZAt1p9Dqvv9F8zSwvdct_BPRtT3G1Hg-4nvkrNdjl5dwT3R0uQ4QCc9ybZflL73R51Z9dy2phuXZaZ59rQBySxCS7DKbP_2Xfx0KPYrHVilmD07nMYOTOBTPHnlyfgf4mQ5jtaJ1S35kUCq4SBJtv0EAWqDjfZJjQ3YPzFu8Pk_W1ClyUdjBzl5JM_xmCfb3EsN7c1bgIJ5gwew3Ttp6_o9MD7xkI8uIC7xKHm4aiJDS_bLaBu0FwwYFSmOyxmGmqw7HJH',
    lastMessage: 'Lưu trữ tài liệu cá nhân',
    lastMessageTime: 'Now',
    isCloud: true,
  },
  {
    id: 'alex',
    name: 'Alexander Jameson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBinnBqLIb2o1BpWxYwy74IJsITM0_byrQnEVziSkykhYw3EX0g587sFTf_UfkgATZazDhzjZzk6Y29EXZTwUamWsS3Rm_P0uF8FN3HOHk8lSuo6S6_b4Vlks6tEfeNp3rtTg2W9yvs_RkFyID_T_M9OxF1Uqz7wS38LRvnalPR7ee9Uos2LdqHtqaMyTnPv-pantefwra60KJeGvjeqtWsZcMt5Wf6eSK_UiuRFk27oSDxS_-eq38Vxo7s91OBrfJYIzaJ76FNE7hQ',
    lastMessage: 'Check these property stats...',
    lastMessageTime: 'Now',
    unreadCount: 1,
  },
  {
    id: 'travis',
    name: 'Travis Barker',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8bZxRdIH0wn1SO2ct1qgLEb3Qwov_DAIl4adxxS_NUSJvuENKvTHKYfGfKsjkhHg-Q1JMbduYIdLrqd8s9w_KcuHJua-hrkscJldl4kHsg9_DOwZ2r7WfZkXXkTwt2RnrQh1sKLJKLDaJTrUttsGAq2E6zJutKERWPkcV7FgkMWXu_hLKsaCwKdd9zgVrJIA03ikYVM5n49-G2SmciQoBIW7LR-l02sz3N1oH2Fd06huS27qExY333GzQCnqPttrkRS2HP_3PnTxM',
    lastMessage: 'The contract is ready for review.',
    lastMessageTime: '2m',
  },
  {
    id: 'kate',
    name: 'Kate Rose',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjCwR22KII3wdOMoeInflo1b5eITPpP6JPZA-UB8uALPbyt7t-AFQ7EfViYlGDRUcAZ4TtyXAtjmRmjhwRD7wNb8Zz7txMJzLryfZH9_mMGgmscUo_4tzLXQMr2GE2SxTSLj5a1mfpJ7R2U8mgdfRl8yNXX-6lvMDUokoCBvE4pYbJqKy-o6m0FK7xtc8vpFraMUuDG6azRFq8wDQ_riA_eg7vnZKZ6C5uoRqQahWZTlvs2wYi_-lVAfT_P2ROkphx-zMO2jtRpiB_',
    lastMessage: 'See you at the property tour!',
    lastMessageTime: '15m',
  },
  {
    id: 'john',
    name: 'John Doe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzudco_fYOwGordd5Ql3vjwYm5yoQAi-zgzPnr8Vy3GsR-imsqeet9llwQbM3nMG1Tj-JA_W-giRQTXE0DGYWCmz2Xw063q4ZZOy6BG8di1X-FqFk6fQiiewmDDAlwg3vT2G18FgMgObWSqkhoQi-fiSsiYkhYoQHNv3D2fCpOIBFfsfrlB17PeDdHAnH8Eni9hqmDxnEB0lFTKuVbSIiq9hlIOxLOpNg6W8lkNhsnGF11P_3aZE0jHFtHPFYL5VSAEdtjTpCLFn0C',
    lastMessage: 'Sent a photo of the facade.',
    lastMessageTime: '1h',
  },
];

export const mockMessages: Record<string, Message[]> = {
  'alex': [
    {
      id: '1',
      conversationId: 'alex',
      senderId: 'me',
      content: "Hey Alexander! I'm interested in the new downtown property. Can you share the latest stats and some photos?",
      type: 'text',
      timestamp: '10:42 AM',
    },
    {
      id: '2',
      conversationId: 'alex',
      senderId: 'alex',
      content: '',
      type: 'voice',
      timestamp: '10:43 AM',
      metadata: { duration: '0:14' },
    },
    {
      id: '3',
      conversationId: 'alex',
      senderId: 'alex',
      content: '',
      type: 'metadata',
      timestamp: '10:44 AM',
      metadata: {
        dailyVisitors: '2,429',
        buildingAge: '3Y',
        currentTemp: '28°F',
      },
    },
    {
      id: '4',
      conversationId: 'alex',
      senderId: 'alex',
      content: '',
      type: 'image',
      timestamp: '10:45 AM',
      metadata: {
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD3cD8TAhN-EOuzb53MxPoKlZciVXYwP3viunxUQiSb5trm3RfQC2h7Zrr6cASVNZP_Uyi6XEAoZkNMHdDuVSEiXNXBu0QZR7wxZT7uuV-Fie99JFXK8zOFUpuFoV0JDWkobcvtUx7xTgfhQ6UMzknFXHfUrX7ySQgM1zP90khA0kp-T1AUeB2CmYHlTzvE1hJAPOZGBdW6qiF3pwmtMAsjFILGRk8qmyl6FEquhEGRJ3Xv72XSwhDTdCDXkhgFrUap2e5N8j-gFzqv',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AE1uKaeVwd0Y8O3RC8umD-CKWiDhPkLXZTPy8_5vsY2HBZBjnijT5cv9tg4gyv-ODmtN0gtidyoWrynHq9M9pS2As36Bm1jhGP491ajEA5W62OHWpnBc1cKviNhBYoi_LV9NvXiUFatoR8svjDjedxOZSXQr_31PQIXmkQX22MOM5wKMDFpER5k-kTI4vlavI6kXd7Z77NYjG4gr5HyyDSrW2yJOn3Qju2sia8YuvRwEtTezeYEWoS8UumZS9KT-Xy3XaKlWpNXw',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBfSDLiQq_Zfnp3ht59lp9ziH5iKBv4ntHkuAyz_abZvbU58LOWEBzDgsfEkCUNZSzqqZOxTEDMKRKbXNh_Ljm9YmaigIvUtVhnrV0sfMX4U6N6nKeSHj0GqxYwLGfldkAWqJNW1k2PllGye9bN-n7DhZVoJbWbOJHNaOQm0S7xol3kxcda0GeVedSDwZZ2U3HdFR943YJvKyG4qt-C6FNcwFVslTbVk8QVsrSiJwN214ZeO2LxOdGaIemcZC9X8gWMxV5u-xw0BIij'
        ]
      },
    },
  ],
  'my-cloud': [
    {
      id: 'cloud-1',
      conversationId: 'my-cloud',
      senderId: 'me',
      content: 'Lưu trữ tài liệu cá nhân ở đây.',
      type: 'text',
      timestamp: 'Yesterday',
    }
  ]
};

export const mockFriendRequests: FriendRequest[] = [
  {
    id: 'req1',
    senderId: 'user1',
    receiverId: 'me',
    status: 'pending',
    createdAt: '2026-03-30T10:00:00Z',
    senderName: 'Lê Văn Tám',
    senderAvatar: 'https://picsum.photos/seed/user1/200/200',
  },
  {
    id: 'req2',
    senderId: 'user2',
    receiverId: 'me',
    status: 'pending',
    createdAt: '2026-03-31T08:00:00Z',
    senderName: 'Nguyễn Thị Bưởi',
    senderAvatar: 'https://picsum.photos/seed/user2/200/200',
  },
];

export const mockChatMedia: Record<string, ChatMedia> = {
  'alex': {
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3cD8TAhN-EOuzb53MxPoKlZciVXYwP3viunxUQiSb5trm3RfQC2h7Zrr6cASVNZP_Uyi6XEAoZkNMHdDuVSEiXNXBu0QZR7wxZT7uuV-Fie99JFXK8zOFUpuFoV0JDWkobcvtUx7xTgfhQ6UMzknFXHfUrX7ySQgM1zP90khA0kp-T1AUeB2CmYHlTzvE1hJAPOZGBdW6qiF3pwmtMAsjFILGRk8qmyl6FEquhEGRJ3Xv72XSwhDTdCDXkhgFrUap2e5N8j-gFzqv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AE1uKaeVwd0Y8O3RC8umD-CKWiDhPkLXZTPy8_5vsY2HBZBjnijT5cv9tg4gyv-ODmtN0gtidyoWrynHq9M9pS2As36Bm1jhGP491ajEA5W62OHWpnBc1cKviNhBYoi_LV9NvXiUFatoR8svjDjedxOZSXQr_31PQIXmkQX22MOM5wKMDFpER5k-kTI4vlavI6kXd7Z77NYjG4gr5HyyDSrW2yJOn3Qju2sia8YuvRwEtTezeYEWoS8UumZS9KT-Xy3XaKlWpNXw',
    ],
    files: [
      { name: 'Property_Stats.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Contract_Draft.docx', size: '1.1 MB', type: 'docx' },
    ],
    links: [
      { title: 'Downtown Property Listing', url: 'https://example.com/property/123' },
      { title: 'Virtual Tour', url: 'https://example.com/tour/123' },
    ],
  },
};
