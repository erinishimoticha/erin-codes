var erincodes = angular.module('erincodes', []);

erincodes.controller('SiteController', function ($scope) {
    $scope.site = {
        name: "erin codes"
    };
});

// Yuck, find a better way to do this.
erincodes.controller('SkillsPairsController', function ($scope) {
    $scope.pairs = [
        [{
            name: "Languages",
            desc: "JavaScript, Python, Perl, Java. Familiar with Ruby, Bash, C.",
            icon: "fa-code"
        }, {
            name: "Databases and Servers",
            desc: "Node.js, Redis, PostGreSQL, MySQL, Apache, Asterisk. Familiar with MongoDB, Lighttpd, Tomcat.",
            icon: "fa-database"
        }], [{
            name: "Protocols and Standards",
            desc: "TCP/IP, WebRTC, HTTP, REST, WebSockets, XML, AJAX. Familiar with SIP, RTP/SRTP.",
            icon: "fa-university"
        }, {
            name: "Methodologies and Processes",
            desc: "Agile/Scrum, REST, MVC, Object-oriented programming. Git, SVN",
            icon: "fa-list-ol"
        }], [{
            name: "Operating Systems and Platforms",
            desc: "Linux, Unix, OS X. Heroku, Familiar with AWS.",
            icon: "fa-linux"
        }, {
            name: "Specialties",
            desc: "Software Architecture, API design, Integration, Interoperability",
            icon: "fa-trophy"
        }]
    ];
});

erincodes.controller('ProjectsController', function ($scope) {
    // set dataPluginOptions: '{"type":"iframe"}' for youtube

    $scope.projects = [{
        externalLink: "https://github.com/asterisk/asterisk_rest_libraries",
        type: "external-link",
        name: "Asterisk REST Client Library Generator",
        shortName: "Asterisk Code Generator",
        image: "images/demo/portfolio/thumb/code-generator.jpg",
        date: "February 2013 - April 2013",
        templateClass: "development",
        dataPluginOptions: ''
    }, {
        externalLink: "http://digium.com/en/products/voip-gateways#test-drive",
        type: "external-link",
        name: "Digium VoIP Gateway Configuration Interface",
        shortName: "Web App for Appliance Configuration",
        image: "images/demo/portfolio/thumb/gateway.jpg",
        date: "May 2011 - May 2013",
        templateClass: "photography",
        dataPluginOptions: ''
    }, {
        externalLink: "https://github.com/erinspice/geni-perl",
        type: "external-link",
        name: "WWW::Geni Perl Module",
        shortName: "WWW::Geni Perl Module",
        image: "images/demo/portfolio/thumb/geni.jpg",
        date: "2011",
        templateClass: "photography",
        dataPluginOptions: ''
    }, {
        externalLink: "https://github.com/asterisk/publish-docs",
        type: "blank",
        name: "Asterisk Documentation Publishing Tool",
        shortName: "Docs Publishing Tool",
        image: "images/demo/portfolio/thumb/document.jpg",
        date: "September 2010 - October 2011",
        templateClass: "design",
        dataPluginOptions: ''
    }, {
        externalLink: "https://github.com/erinspice/erin-codes",
        type: "external-link",
        name: "This website: Erin Codes",
        shortName: "This website: Erin Codes",
        image: "images/demo/portfolio/thumb/erin.codes.jpg",
        date: "June 2014 - Present",
        templateClass: "development",
        dataPluginOptions: ''
    }, {
        externalLink: "#",
        type: "plus",
        name: "JSDoc3 Confluence Template",
        shortName: "JSDoc3 Confluence Template",
        image: "images/demo/portfolio/thumb/dont-always-document.jpg",
        date: "August 2013 - Present",
        templateClass: "development",
        dataPluginOptions: ''
    }, {
        externalLink: "#",
        type: "plus",
        name: "GEICO Web App for Calculating Insurance Rates",
        shortName: "Web App for Calculating Insurance Rates",
        image: "images/demo/portfolio/thumb/geico-gecko.jpg",
        date: "2005",
        templateClass: "design",
        dataPluginOptions: ''
    }, {
        externalLink: "https://github.com/erinspice/geni-rootsweb-gedcom-santizer",
        type: "external-link",
        name: "GEDCOM Formatter for Ancestry.com's RootsWeb",
        shortName: "GEDCOM Parser",
        image: "images/demo/portfolio/thumb/family-tree.jpg",
        date: "May 2012",
        templateClass: "plus",
        dataPluginOptions: ''
    }, {
        externalLink: "https://github.com/erinspice/geni-automerge",
        type: "external-link",
        name: "Geni.com Profile Merger",
        shortName: "Geni.com Profile Merger",
        image: "images/demo/portfolio/thumb/geni.jpg",
        date: "May 2012",
        templateClass: "design",
        dataPluginOptions: ''
    }, {
        externalLink: "http://fuzzymonkey.net",
        type: "external-link",
        name: "FuzzyMonkey.net WebHosting Provider",
        shortName: "Built WebHosting Company",
        image: "images/demo/portfolio/thumb/fuzzymonkey.jpg",
        date: "2002-2013",
        templateClass: "design",
        dataPluginOptions: ''
    }];
});