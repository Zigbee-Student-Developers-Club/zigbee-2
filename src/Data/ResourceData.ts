interface ResourceObject {
    courseName: string;
    author: string;
    url: string;
    domain: string;
  }
  
  export const ResourceData: ResourceObject[] = [
    {
      courseName: 'Netacad',
      author: 'CISCO',
      url: 'https://www.netacad.com/courses/networking',
      domain: 'networking',
    },
    {
      courseName: 'Computer Networking Beginner to Pro (Hindi)',
      author: 'Shesh Chauhan',
      url: 'https://youtu.be/vGjH9leVXaM',
      domain: 'networking',
    },
    {
      courseName: 'Machine Learning',
      author: 'Andrew Ng',
      url: 'https://youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN',
      domain: 'machineLearning',
    },
    {
      courseName: 'Learn HTML and CSS',
      author: 'Per Harald Borgen',
      url: 'https://scrimba.com/learn/htmlandcss',
      domain: 'frontendDev',
    },
    {
      courseName: 'Learn JavaScript',
      author: 'Per Harald Borgen',
      url: 'https://scrimba.com/learn/learnjavascript',
      domain: 'frontendDev',
    },
  
    {
      courseName: 'Learn React',
      author: 'Bob Ziroll',
      url: 'https://scrimba.com/learn/learnreact',
      domain: 'frontendDev',
    },
    {
      courseName: 'Learn UI design fundamentals',
      author: 'Gary Simon',
      url: 'https://scrimba.com/learn/design',
      domain: 'designing',
    },
    {
      courseName: 'Node.js and Express.js',
      author: 'John Smilga',
      url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
      domain: 'backendDev',
    },
    {
      courseName: 'Building a RESTful API with Node.js',
      author: 'Academind',
      url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
      domain: 'backendDev',
    },
    {
      courseName: 'Flutter Tutorial for Beginners',
      author: 'The Net Ninja',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ',
      domain: 'androidDev',
    },
    {
      courseName: 'Flutter & Firebase App Build',
      author: 'The Net Ninja',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9j--TKIdkb3ISfRbJeJYQwC',
      domain: 'androidDev',
    },
    {
      courseName: 'Flutter Animation Tutorial',
      author: 'The Net Ninja',
      url: 'https://youtube.com/playlist?list=PL4cUxeGkcC9gP1qg8yj-Jokef29VRCLt1',
      domain: 'androidDev',
    },
    {
      courseName: 'Networking Basics: What You Need to Know',
      author: 'CISCO',
      url: 'https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html',
      domain: 'networking',
    },
    {
      courseName: 'The Fundamentals of Networking',
      author: 'IBM',
      url: 'https://www.ibm.com/in-en/cloud/learn/networking-a-complete-guide',
      domain: 'networking',
    },
    {
      courseName: 'CompTIA Network+ Study Guide: Exam N10-007',
      author: 'Todd Lammle',
      url: 'https://www.amazon.in/dp/1119432251/',
      domain: 'networking',
    },
  ];
  
  // const resourceData: ResourceProp = {
  //     androidDev: [
  //       {
  //         courseName: "Flutter Tutorial for Beginners",
  //         author: "The Net Ninja",
  //         url: "https://youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ",
  //       },
  //       {
  //         courseName: "Flutter & Firebase App Build",
  //         author: "The Net Ninja",
  //         url: "https://youtube.com/playlist?list=PL4cUxeGkcC9j--TKIdkb3ISfRbJeJYQwC",
  //       },
  //       {
  //         courseName: "Flutter Animation Tutorial",
  //         author: "The Net Ninja",
  //         url: "https://youtube.com/playlist?list=PL4cUxeGkcC9gP1qg8yj-Jokef29VRCLt1",
  //       },
  //     ],
  //     backendDev: [
  //       {
  //         courseName: "Node.js and Express.js",
  //         author: "John Smilga",
  //         url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  //       },
  //       {
  //         courseName: "Building a RESTful API with Node.js",
  //         author: "Academind",
  //         url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  //       },
  //     ],
  //     designing: [
  //       {
  //         courseName: "Learn UI design fundamentals",
  //         author: "Gary Simon",
  //         url: "https://scrimba.com/learn/design",
  //       },
  //     ],
  //     frontendDev: [
  //       {
  //         courseName: "Learn HTML and CSS",
  //         author: "Per Harald Borgen",
  //         url: "https://scrimba.com/learn/htmlandcss",
  //       },
  //       {
  //         courseName: "Learn CSS Flexbox",
  //         author: "Per Harald Borgen",
  //         url: "https://scrimba.com/learn/flexbox",
  //       },
  //       {
  //         courseName: "Learn CSS Grid",
  //         author: "Per Harald Borgen",
  //         url: "https://scrimba.com/learn/cssgrid",
  //       },
  //       {
  //         courseName: "Learn JavaScript",
  //         author: "Per Harald Borgen",
  //         url: "https://scrimba.com/learn/learnjavascript",
  //       },
  //       {
  //         courseName: "Build a space travel website",
  //         author: "Kevin Powell",
  //         url: "https://scrimba.com/learn/spacetravel",
  //       },
  //       {
  //         courseName: "Build and deploy your portfolio",
  //         author: "Kevin Powell",
  //         url: "https://scrimba.com/learn/portfolio",
  //       },
  //       {
  //         courseName: "Deploying with Netlify",
  //         author: "Treasure Porth",
  //         url: "https://scrimba.com/learn/netlify",
  //       },
  //       {
  //         courseName: "Learn React",
  //         author: "Bob Ziroll",
  //         url: "https://scrimba.com/learn/learnreact",
  //       },
  //     ],
  //     fullStackDev: [
  //       {
  //         courseName: "",
  //         author: "",
  //         url: "",
  //       },
  //     ],
  //     machineLearning: [
  //       {
  //         courseName: "Machine Learning",
  //         author: "Andrew Ng",
  //         url: "https://youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN",
  //       },
  //     ],
  //     networking: [
  //       {
  //         courseName: "Netacad",
  //         author: "CISCO",
  //         url: "https://www.netacad.com/courses/networking",
  //       },
  //       {
  //         courseName: "Computer Networking Beginner to Pro (Hindi)",
  //         author: "Shesh Chauhan",
  //         url: "https://youtu.be/vGjH9leVXaM",
  //       },
  //     ],
  //   };