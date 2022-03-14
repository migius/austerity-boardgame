const messages = {
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
        info: {
            title: 
            {
                title: "Introduction",
                par: `<p><i>Austerity</i> is a single-player board game in which you take the role of the finance minister in a country near-crippled with debt. You decide which institutions are funded, where the cuts are made and choose how to react to events that occur – but the rest of the country has other ideas and won’t necessarily behave… if you can’t balance the budget and pay off the country’s debt before your decisions come back to haunt you, you’ll be out of office and out on the street with the rest of them! </p>
                        <p>In <i>Austerity</i>, the state of the country’s finances is represented by a budget bag of coloured cubes; each cube represents funding for security services or welfare programmes, income, debt or the unrest and crime that result from such desperate times. As the year progresses the player draws pairs of cubes from the bag, which determine events that occur that the player must react to. The player may decide when to raise taxes or sell government gilts, when income is available which institutions to funnel funding to, and when debt rears its ugly head which institutions have to face the cuts of austerity.</p>`
            },
            action_title: 
            {
                title: "Playing the Game",
                par: `<h6><em>N.B. this game rules are implemented in the page, you can simply follow the availables actions</em></h6>
                <h5>A Year in Politics</h5>
                <p>Draw two cubes from the bag and place them in the ‘Current’ area.</p> 
                <p>Look at the Cube Draw Results entry for the pair that you've drawn and follow the instructions for that event - see Add/Remove/Spend below for more details. In several events there's a choice you have to make - pick either one option or the other, but not both. If you have the option to move a track beyond its maximum you may still take that option, but that particular track does not change.</p>
                <p>After your event, if a single black Debt cube remains in the Current area – with or without a cube of another colour – you must advance the Cuts track on one of the Institutions at the bottom of the page - see Cuts below for details.</p>
                <p>If any of the cubes drawn were yellow Income cubes, you may use the money to Fund one of the three Institutions or you may bank it in your Treasury for later - see Income below for details. It is not required to do either.</p>
                <div class='ms-4 '><em>If any special rules allow you to place different coloured cubes in the Treasury, this is done in exactly the same way as for Income cubes above.</em></div>
                <p>Move any remaining cubes in the Current area to the Used area below it, and then draw another two cubes and repeat the above steps until the bag is empty. If at any point you can only draw a single cube, place it directly into the Used area and ignore it for this Year.</p>
                <p>At any time during the year you may carry out any of the three actions listed in the centre of the page - see Actions below.</p>
                <div class='ms-4 '><em>
                    <p>Example</p>
                    <p>Two cubes are drawn from the bag – an Income cube and a Security cube.</p>
                    <p>Looking at the Cube Draw Results table, this means that the ‘Security Spending’ event has occurred, and we must choose whether to increase Public Safety or Popularity. We choose the populist security-theatre option, and increase the Popularity track by one.</p>
                    <p>Next, since one of the cubes is an Income cube, we may use that money – we choose to Fund Private Enterprise, giving out government grants to encourage employment and raise the Employment track by one. The yellow Income cube is placed on the Private Enterprise space, and the blue Security cube is placed in the Used area.</p>
                </em></div>
                <h5>Year End</h5>
                <p>After you have emptied the Budget Bag, the political year ends; perform the following steps in sequence:</p>
                <ul>
                    <li>Check to see if you have won - see Ending the Game below</li>
                    <li>Add a number of yellow Income cubes to your Treasury equal to the number of Income icons printed in the current space on the Employment track (0, 1 or 2).</li>
                    <li>Adjust Wealth one step up or down the track towards the level of Employment (e.g. if Employment is lower than Wealth, reduce Wealth by one step; if Employment is at the same level as Wealth, then leave Wealth where it is).</li>
                    <li>Adjust Health one step up or down the track towards the level of Public Safety.</li>
                    <li>Adjust Popularity one step up or down the track towards the level of Wealth, and then adjust Popularity a second time one step up or down the track towards the level of Health.</li>
                    <li>Put all the cubes from the Used area and Income cubes placed on Institutions back in the bag and start the next political year.</li>
                </ul>
                <h5>Add/Remove/Spend</h5>
                <p>When you see the following keywords, perform the relevant procedure:</p>
                <ul>
                    <li>Add - add an extra cube of the relevant colour to the Used area, ready to go into the bag at the end of the year.</li>
                    <li>Add to Bag - add an extra cube of the relevant colour directly to the bag.</li>
                    <li>Remove - remove a cube of the relevant colour from the Current area and out of the game. If there is not a cube of the relevant colour in the Current area, you may remove it from the Used area or the Treasury instead.</li>
                    <li>Spend - remove a yellow Income cube from the Treasury or the Current area and out of the game.</li>
                </ul>
                <p>Note that Spend is very similar to Remove, but allows you to choose which of the Current area or the Treasury to take the cube from, but does not allow you to take it from the Used area. Remove does not allow you to choose which box to take the cube from if there is an appropriate cube in the Current area.</p>
                <p>When cubes are removed or spent they are not removed from the game permanently - they may be re-added later through an Add action, but for now they re-join the supply of cubes waiting to be used. There is not intended to be any resource limit on any of these cubes.</p>
                <h5>Cuts</h5>
                <p>If a black Debt cube – with or without a cube of another colour – remains in your Current area after your event, then as your nation struggles to pay off its debts you need to cut the budget of one of your national institutions. It's only temporary! At least, that's what you tell the press.</p>
                <p>Check the Institutions at the bottom of the board to see which ones have the colour pair you drew listed against their Cuts track; pick one of those Institutions and advance the marker token one step along the track.</p>
                <p>Once the marker token reaches the final step - that is, this Institution has been selected for cuts three times - perform the penalty listed in that final step and then move the marker token back to the leftmost start step on the track until further cuts are assigned to this Institution.</p>
                <h5>Income</h5>
                <p>If any of the cubes you drew were yellow Income cubes, then you may either spend that money on one of your national institutions immediately, or save it in your Treasury for future emergencies. You do not have to do either – you may move Income cubes to the Used area if you like.</p>
                <p>If you wish to save the Income for later, then place the cube directly into your Treasury, where it may later be Spent to mitigate future events. Bear in mind that this takes the cube out of the budget bag permanently – Income cubes cannot move from the Treasury to the bag, you may only Spend cubes in the Treasury.</p>
                <p>Alternatively, if you wish to fund an Institution, place the cube on the Institution of your choice at the bottom of the page and immediately claim the reward listed to the right of the arrow. Only one cube may be placed on each Institution in a year - you may not place a second cube nor claim a second reward from the same Institution in a single year.</p>
                <div class='ms-4 '><em>(Note that some of the optional Advanced Rules allow you to break the one-cube-per-Institution-per-year rule.)</em></div>
                <h5>Actions</h5>
                <p>At any time during the year, you may perform any of the three Actions listed in the centre of the page - Raise Taxes, Borrow Money or Pay Loan. Simply perform the Action as described, which will involve adding or removing some combination of cubes.</p>
                <p>Actions may be performed any number of times in a turn, before or during or after resolving cube effects - but remember that immediately that the bag is emptied, no more actions may be performed until next year.</p>
                <h5>Ending the Game</h5>
                <p>If at any point during the game - even mid-year - any of the tracks falls down to the shaded 0 space at the bottom of the track (Employment, Public Safety, Wealth, Health or Popularity), then you immediately lose the game.</p>
                <p>If at the end of the year, during the ‘Check for Win’ step, there are no black Debt cubes in the Used area, then you have successfully cleaned up your nation's finances and you win!</p>
                <h5>Notes</h5>
                <p>Austerity is not supposed to have component limits – if you run out of a particular colour of cube and have another colour that you could substitute, please do! There is no upper limit to the number of each colour cube to use in the game, but it is highly unlikely that you will ever need more than ten or twelve.</p>
                <p>The contents of the bag is not a secret. You could, after all, count the number of cubes that go in and check which have been pulled out, so feel free to look in the bag at any time and use this information to inform your decisions – just make sure that you give it a good shake afterwards to randomise the next cube draw properly.</p>
                <p>If you have a single cube left over at the end of the Year, that cube is still ignored even if it’s an Income cube (in which case you miss out – bad luck!) or a Debt cube (in which case you don’t have to make cuts for that one cube – lucky!).</p>
                <p>When counting total cubes at Year End for special rule conditions, cubes in the Treasury are not counted.</p>

                `
            },
            extra_inst: 
            {
                title: "Extra Institutions",
                par: `<p>The next three cards down on the Advanced Cards page are new Institutions. At any time, if you wish to invest in your country in a new way, you may Spend two Income to add one of these new Institution cards into play. Place the chosen Institution below the game board, and place an extra marker token on the first space of its Cuts track. From now on, this new Institution is used in exactly the same way as the three printed on the board; you may fund it with Income cubes, it suffers Cuts in the same way, and the rewards and penalties work the same.</p>
                        <p>A note on the Investment Institution, which represents you buying other countries' government bonds: it requires two separate Income cubes of funding in the same year to add a new Income cube; if it is only funded once at the end of the year, the Income cube used is replaced in the bag as usual and you must start again in the next year.</p>
                        `
            },
            scenario: 
            {
                title: "Scenarios",
                par: `<p>At the start of the game, select a scenario card; either choose one, or pick one at random. Rather than the 5/5/5/5/5 from the base game, set the Employment, Public Safety, Wealth, Health and Popularity tracks to the numbers below the title of the scenario you have chosen.</p>
                        <p>Read the rules on the scenario card carefully; these supplement the rules of the base game, and in the case of conflicts between the two, the scenario rules replace the rules in the base game. Several scenarios define additional actions that you can perform during the game.</p>
                        <p>At the beginning of Year End, instead of checking that you have won the usual way, check your scenario card for win conditions.</p>
                        `
            },
            country_profile: 
            {
                title: "Starting Countries",
                par: `<p>At the start of the game, select a country card; either choose one, or pick one at random. This card replaces the usual contents of the bag - place cubes corresponding to the list of ten on the scenario card into the bag.</p>
                        <p>It is highly recommended that if you play with Starting Countries, you also play with Policy Cards. If you do, each Starting Country also dictates one policy decision; rotate the corresponding card to the specified face. Some of these may be altered depending on your choices during play; others are permanent conditions of that country.</p>
                        `
            },
            scenario_diff: 
            {
                title: "A Note on Difficulty",
                par: `<p>The base game should be moderately easy - although still with scope to screw up or suffer from terrible luck!</p>
                        <p>To make the base game easier, add two yellow Income cubes to the bag at the beginning of the game. To make it harder, add one or two extra black Debt cubes.</p>
                        <p>Most of the scenario cards and starting countries generally make the game more challenging, and it's recommended that you play the base game a couple of times to get used to it before graduating onto the scenarios. Each scenario has a choice of difficulty, where 'Easy' is approximately as hard as the base game.</p>
                        <p>Policy Cards have the capacity to make the game a little bit easier, if it's possible to pick your policies to match your situation.</p>
                        <p>Extra Institutions generally balance out - each extra institution purchased makes the game easier, but finding the spare money to purchase them is not so easy!</p>
                        `
            }
        },
        game_interface: {
            loading: "Loading...",
            title: "Austerity",
            subtitle: "A solo game about debt, national budgets and other such trouble.",
            action_title: `What to do now?`,
            options: "New game options",
            howto_play: "Game rules",
            country_profile: {
                label: "Country profile <i class='fas fa-info-circle' ></i>",
                cap_dem: "Capitalist democracy (default)",
                lib_dem: "Liberal Democracy",
                soc_rep: "Socialist Republic",
                tin_dic: "Tinpot Dictatorship",
                custom: "Custom Bag",
                custom_label: "Insert cubes in bag [K > Black/Debt, R > Red/Crime & Unrest, B > Blue/Security & Policing, W > White/Welfare, Y Yellow/Income]"
            },
            difficulty: {
                label: "Difficulty <i class='fas fa-info-circle' ></i>",
                easy: "Easy (+1 Yellow/Income)",
                normal: "Normal",
                hard: "Hard (+1 Black/Debt)",
                very_hard: "Mario Draghi (+2 Black/Debt)",
            },
            extra_inst: {
                label: "Use extra Institutions <i class='fas fa-info-circle' ></i>",
                false: "NO",
                true: "YES",
            },
            turn_track: "Turn track",
            scenario: {
                label: "Scenario <i class='fas fa-info-circle' ></i>",
                olympics: "Olympics",
                economic_crash: "Economic Crash (base game)",
                organised_crime: "Organised Crime",
                war_footing: "War Footing",
            },
            scenario_diff: {
                label: "Scenario Difficulty <i class='fas fa-info-circle' ></i>",
                easy: "Easy",
                normal: "Normal",
                hard: "Hard",
            },
            new_turn: "New turn",
            end_turn: "End turn",
            new_year: "New year",
            new_game: "New game",     
            events_list: "Events list",     
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
            close: "Close",
        },
        keywords: {            
            actions: "Actions",
            institutions: "Institutions",
            employment: "Employment",
            public_safety: "Public Safety",
            wealth: "Wealth",
            health: "Health",
            popularity: "Popularity",
            extra_institutions: "Extra @:institutions",
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
        }
    },
}
