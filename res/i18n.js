const messages = {
    it: {        
    },
    en: {  
        cube_icons: {
            Y: "cube cube-Y fa fa-coins",
            B: "cube cube-B fa fa-user-shield",
            K: "cube cube-K fa fa-credit-card",
            R: "cube cube-R fa fa-bomb",
            W: "cube cube-W fa fa-briefcase-medical",
            X: "cube cube-X fa fa-square",
        },
        cube: {
            Y: "<i class='@:cube_icons.Y' ></i>",
            B: "<i class='@:cube_icons.B' ></i>",
            K: "<i class='@:cube_icons.K' ></i>",
            R: "<i class='@:cube_icons.R' ></i>",
            W: "<i class='@:cube_icons.W' ></i>",
            X: "<i class='@:cube_icons.W' ></i>"            
        },
        small_cube: {
            Y: "<i class='@:cube_icons.Y smallCube' ></i>",
            B: "<i class='@:cube_icons.B smallCube' ></i>",
            K: "<i class='@:cube_icons.K smallCube' ></i>",
            R: "<i class='@:cube_icons.R smallCube' ></i>",
            W: "<i class='@:cube_icons.W smallCube' ></i>",
            X: "<i class='@:cube_icons.X smallCube' ></i>"            
        },
        game_interface: {
            loading: "Loading...",
            close: "Close",
            title: "Austerity",
            subtitle: "A solo game about debt, national budgets and other such trouble.",
            action_title: "What to do now?",
            options: "New game options",
            country_profile: {
                label: "Country profile",
                cap_dem: "Capitalist democracy (default)",
                lib_dem: "Liberal Democracy",
                soc_rep: "Socialist Republic",
                tin_dic: "Tinpot Dictatorship",
                custom: "Custom Bag",
                custom_label: "Insert cubes in bag [K > Black/Debt, R > Red/Crime & Unrest, B > Blue/Security & Policing, W > White/Welfare, Y Yellow/Income]"
            },
            difficulty: {
                label: "Difficulty",
                easy: "Easy (+1 Yellow/Income)",
                normal: "Normal",
                hard: "Hard (+1 Black/Debt)",
                very_hard: "Mario Draghi (+2 Black/Debt)",
            },
            extra_inst: {
                label: "Use extra Institutions",
                false: "NO",
                true: "YES",
            },
            turn_track: "Turn track",
            scenario: {
                label: "Scenario",
                olympics: "Olympics",
                economic_crash: "Economic Crash (base game)",
                organised_crime: "Organised Crime",
                war_footing: "War Footing",
            },
            scenario_diff: {
                label: "Scenario Difficulty",
                easy: "Easy",
                normal: "Normal",
                hard: "Hard",
            },
            new_turn: "New turn",
            end_turn: "End turn",
            new_year: "New year",
            new_game: "New game",     
            report_bug: "report a bug",
            a_game_by: "Austerity is a game by Jake Staines",
            source_code: "Source code",
            alert: {
                NoIncome: "No Income available in Treasury",
                Lose: {
                    title: "YOU LOSE!",
                    ask: "You lose, what do you want to do now?"  
                },
                Win: {
                    title: "YOU WIN!",
                    ask: "You win, what do you want to do now?"  
                },
                EndGame: {
                    title: "End game",
                    ask: "If you want to start a new game click the button: @:game_interface.new_game"  
                },
                NotEnoughY: "Not enough yellow cubes!",
                NotEnoughK: "Not enough black cubes!",
                NotEnoughR: "Not enough red cubes!",
                NotEnoughB: "Not enough blue cubes!",
                NotEnoughW: "Not enough white cubes!",
                cube_choice: "Cube choice",
                ask_cube_choice: {
                    Y: "Where do you want to take @:cube.Y from?",
                    B: "Where do you want to take @:cube.B from?",
                    K: "Where do you want to take @:cube.K from?",
                    R: "Where do you want to take @:cube.R from?",
                    W: "Where do you want to take @:cube.W from?",
                },
                buy_extra_inst: "What Extra Institution do you want to buy?",
            },
            buy_extra_inst: "Buy an extra Institution for @:cube.Y @:cube.Y",
            click_to_X_content: {
                X: "click here to {0} content",
                show: "show",
                hide: "hide",
            },
            look_to_curr_game: "Cancel",
        },
        keywords: {            
            actions: "Actions",
            institutions: "Institutions",
            employment: "Employment",
            public_safety: "Public Safety",
            wealth: "Wealth",
            health: "Health",
            popularity: "Popularity",
            extra_institutions: "Extra @:keywords.institutions",
        },
        Spaces: {
            Bag: "Bag",
            Current: "Current",
            Used: "Used",
            Treasury: "Treasury"
        },
        cube_draw: {
            KK: {
                Title: "Economic Downturn",
                Description: "Reduce Wealth by one and increase cuts on every institution by one",
                ReduceWealth: "Reduce Wealth by one",
                IncreaseCuts: "Increase cuts on every institution by one",
            },
            BK: {
                Title: "Underfunded Police Force",
                Description: "Spend @:cube.Y or add @:cube.R (+ Cuts)",
                SpendY: "Spend @:cube.Y",
                AddR: "Add @:cube.R",
            },
            KR: {
                Title: "Political Corruption",
                Description: "Decrease Popularity by one (+ Cuts)",
                DecreasePopularity: "Decrease Popularity by one",
                DecreasePopularity_OC: "Add 1 @:cube.R and decrease Popularity by one",
            },
            RY: {
                Title: "Anti-Austerity Protests",
                Description: "Either Remove @:cube.Y and @:cube.R or increase Popularity by one and add @:cube.K",
                RemoveYR: "Either Remove @:cube.Y and @:cube.R",
                IncreasePopularityAddK: "Increase Popularity by one and add @:cube.K",
            },
            RR: {
                Title: "Industrial Violations",
                Description: "Decrease Public Safety by two",
                DecreasePS2: "@:cube_draw.RR.Description",
            },
            RW: {
                Title: "Welfare Cheats",
                Description: "Decrease Employment by one",
                DecreaseEmployment: "@:cube_draw.RW.Description",
            },
            WW: {
                Title: "Back-to-Work Programme",
                Description: "Increase Employment by two",
                IncreaseEmployment2: "@:cube_draw.WW.Description",
            },
            YY: {
                Title: "Budget Surplus",
                Description: "Increase Wealth by one; may spend both cubes to fund a single already-funded institution",
                IncreaseWealth: "Increase Wealth by one",
                SpendYY: "Spend both cubes to fund a single already-funded institution",
                NO: "Don't do it",    
            },
            KY: {
                Title: "Early Repayments",
                Description: "Optionally Spend @:cube.Y to Remove @:cube.K (or Cuts)",
                SpendYRemoveK: "Spend @:cube.Y to Remove @:cube.K",
                Cuts: "Cuts",
            },
            BY: {
                Title: "Security Spending",
                Description: "Increase Popularity or Public Safety by one",
                IncreasePopularity: "Increase Popularity",
                IncreasePS: "Increase Public Safety",
            },
            BB: {
                Title: "Falling Crime Rates",
                Description: "Increase Public Safety by two",
                IncreasePS: "@:cube_draw.BB.Description",
            },
            BR: {
                Title: "Special Operations",
                Description: "Either Remove @:cube.B and @:cube.R or reduce Public Safety by one",
                RemoveBR: "Either Remove @:cube.B and @:cube.R",
                ReducePS: "Reduce Public Safety",
            },
            BW: {
                Title: "Welfare Cheat Crackdown",
                Description: "Either Remove @:cube.W or increase Employment by one and decrease Popularity by one",
                RemoveW: "Remove @:cube.W",
                IncreaseEmploymentDecreasePopularity: "Increase Employment by one and decrease Popularity by one",
            },
            WY: {
                Title: "Nationalised Healthcare Spending",
                Description: "Increase Health by two",
                IncreaseHealth: "@:cube_draw.WY.Description",
            },
            KW: {
                Title: "Welfare Budget Problems",
                Description: "Spend @:cube.Y or reduce Health by one. (+ Cuts)",
                SpendY: "Spend @:cube.Y",
                ReduceHealth: "Reduce Health by one",
            },
        },
        action_description: {
            IncreaseCuts: { //todo: migliorare...
                PE: "Increase cuts on @:institution.PE.title",
                NS: "Increase cuts on @:institution.NS.title",
                SW: "Increase cuts on @:institution.SW.title",
                IF: "Increase cuts on @:institution.IF.title",
                IN: "Increase cuts on @:institution.IN.title",
                HE: "Increase cuts on @:institution.HE.title",
            },
            Funds: {
                Discard: "Move @:cube.Y to the Used area",
                Treasury: "Place @:cube.Y into your Treasury",
                Fund: "Fund an Institution",
                Choice: {
                    PE: '+1 Employment',
                    NS: 'add <i class="cube cube-B fa fa-user-shield "></i>',
                    SW: 'add <i class="cube cube-W fa fa-briefcase-medical "></i>',
                }
            }
        },
        standard_actions: {
            borrow_money: {
                title: "Borrow Money",
                description: "Add @:cube.Y @:cube.Y<br />Add to bag @:cube.K",
                btn_text: "@:title <hr /> @:description",
            },
            raise_taxes: {
                title: "Raise Taxes",
                description: "Add to bag @:cube.Y @:cube.R<br />&nbsp;",
                btn_text: "@:title <hr /> @:description",
            },
            pay_loans: {
                title: "Pay Loans",
                description: "Remove @:cube.Y @:cube.Y @:cube.K<br />&nbsp;",
                btn_text: "@:title <hr /> @:description",
            },
            finance_olympics: {
                title: "Finance the Olympics",
                description: "Add @:cube.Y to this box",
                btn_text: "@:title <hr /> @:description",
            },
            war_footing: {
                title: "Feed the War",
                description: "Spend @:cube.Y and -1 @:keywords.employment",
                btn_text: "@:title <hr /> @:description",
            },
        },
        institution: {
            PE: {
                title: "Private Enterprise", 
                action: "@:cube.Y <i class='cube fa fa-arrow-right '>     +1 @:keywords.employment</i>",
                effect: " - 2 @:keywords.employment",
            },
            NS: {
                title: "National Security", 
                action: "@:cube.Y <i class='cube fa fa-arrow-right '>     add @:cube.B</i>",
                effect: " Add @:small_cube.R",
            },
            SW: {
                title: "Social Welfare", 
                action: "@:cube.Y <i class='cube fa fa-arrow-right '>     add @:cube.W</i>",
                effect: " - 2 @:keywords.health",
            },
            IF: {
                title: "Infrastructure", 
                action: "@:cube.Y <i class='cube fa fa-arrow-right '>     +1 @:keywords.wealth</i>",
                effect: " - 1 @:keywords.health",
            },
            IN: {
                title: "Investment", 
                action: "@:cube.Y <i class='cube fa fa-arrow-right '>     @:cube.Y <i class='cube fa fa-arrow-right '>     add @:cube.Y",
                effect: " Add @:small_cube.K",
            },
            HE: {
                title: "Higher Education", 
                action: "@:cube.Y <i class='cube fa fa-arrow-right '>     +1 @:keywords.employment and -1 @:keywords.wealth</i> ",
                effect: " Add @:small_cube.R",
            }
        },
        instructions: {
            introduction: {
                title: "Introduction",
                text: "Austerity is a single-player board game in which you take the role of the finance minister in a country near-crippled with debt. You decide which institutions are funded, where the cuts are made and choose how to react to events that occur – but the rest of the country has other ideas and won’t necessarily behave… if you can’t balance the budget and pay off the country’s debt before your decisions come back to haunt you, you’ll be out of office and out on the street with the rest of them!<br/>In Austerity, the state of the country’s finances is represented by a budget bag of coloured cubes; each cube represents funding for security services or welfare programmes, income, debt or the unrest and crime that result from such desperate times. As the year progresses the player draws pairs of cubes from the bag, which determine events that occur that the player must react to. The player may decide when to raise taxes or sell government gilts, when income is available which institutions to funnel funding to, and when debt rears its ugly head which institutions have to face the cuts of austerity.",
            },
            actions: {
                title: "@:keywords.actions",
                text: "At any time during the year, you may perform any of the three Actions listed in the centre of the page - Raise Taxes, Borrow Money or Pay Loan. Simply perform the Action as described, which will involve adding or removing some combination of cubes.                 <br />Actions may be performed any number of times in a turn, before or during or after resolving cube effects - but remember that immediately that the bag is emptied, no more actions may be performed until next year.",
            },
        }
    },
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
})
