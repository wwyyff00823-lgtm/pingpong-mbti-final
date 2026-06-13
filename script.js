// ====================== 唯一需要修改的3个配置 ======================
const HUPIJIAO_MCH_ID = "201906181673";
const HUPIJIAO_KEY = "685ed8bb1d5468e8771aaee1109913c4";

// 16种人格头像上传通道（后续替换为图片链接即可）
const PERSONALITY_AVATARS = {
    "INTJ": "🏓", "INTP": "🏓", "ENTJ": "🏓", "ENTP": "🏓",
    "INFJ": "🏓", "INFP": "🏓", "ENFJ": "🏓", "ENFP": "🏓",
    "ISTJ": "🏓", "ISFJ": "🏓", "ESTJ": "🏓", "ESFJ": "🏓",
    "ISTP": "🏓", "ISFP": "🏓", "ESTP": "🏓", "ESFP": "🏓"
};
// =================================================================

// 5大模块30道情景题（带权重和交叉验证标记）
const questions = [
    // 模块1：器材与习惯（权重20%）
    {
        module: "第一模块：器材与习惯",
        type: "core",
        text: "你握拍的方式是？",
        options: [
            { text: "直板，传统左推右攻", scores: { S: 3, J: 2, I: 1 } },
            { text: "直板横打，两面都能进攻", scores: { N: 3, T: 2, E: 1 } },
            { text: "横板，两面反胶弧圈", scores: { N: 3, T: 2, F: 1 } },
            { text: "随便，拿起来能打就行", scores: { P: 3, F: 2, E: 1 } }
        ]
    },
    {
        module: "第一模块：器材与习惯",
        type: "secondary",
        text: "你换球拍的频率是？",
        options: [
            { text: "一块拍用好几年，打坏了才换", scores: { J: 3, S: 2, I: 1 } },
            { text: "1-2年换一次，跟着技术升级", scores: { T: 3, N: 2, J: 1 } },
            { text: "半年换一次，喜欢尝试新器材", scores: { P: 3, E: 2, N: 1 } },
            { text: "经常换，看到别人用什么好就买", scores: { E: 3, P: 2, F: 1 } }
        ]
    },
    {
        module: "第一模块：器材与习惯",
        type: "core",
        text: "你选胶皮最看重什么？",
        options: [
            { text: "旋转强，能拉出很转的球", scores: { N: 3, I: 2, F: 1 } },
            { text: "速度快，一板就能打死对手", scores: { E: 3, T: 2, J: 1 } },
            { text: "控制好，摆短挑打都舒服", scores: { S: 3, J: 2, I: 1 } },
            { text: "耐用，不用经常灌胶折腾", scores: { J: 3, S: 2, T: 1 } }
        ]
    },
    {
        module: "第一模块：器材与习惯",
        type: "secondary",
        text: "如果只能带一块拍去打球，你会带？",
        options: [
            { text: "纯木板，手感好控制准", scores: { I: 3, S: 2, F: 1 } },
            { text: "芳碳板，进攻防守都均衡", scores: { T: 3, J: 2, N: 1 } },
            { text: "碳板，暴力进攻一板过", scores: { E: 3, P: 2, T: 1 } },
            { text: "随便一块，技术好什么都能打", scores: { P: 3, E: 2, F: 1 } }
        ]
    },
    {
        module: "第一模块：器材与习惯",
        type: "secondary",
        text: "你觉得器材对打球的影响有多大？",
        options: [
            { text: "非常大，好器材能提升30%水平", scores: { S: 3, T: 2, J: 1 } },
            { text: "有影响，但技术更重要", scores: { N: 3, T: 2, I: 1 } },
            { text: "影响不大，主要还是看技术", scores: { I: 3, N: 2, F: 1 } },
            { text: "几乎没影响，高手拿木板都赢", scores: { E: 3, P: 2, F: 1 } }
        ]
    },
    {
        module: "第一模块：器材与习惯",
        type: "secondary",
        text: "你会专门为了对付某个人换胶皮吗？",
        options: [
            { text: "会，专门备一块打长胶的拍", scores: { J: 3, T: 2, S: 1 } },
            { text: "偶尔会，遇到特别难打的对手", scores: { T: 3, N: 2, J: 1 } },
            { text: "不会，用自己习惯的就好", scores: { I: 3, S: 2, F: 1 } },
            { text: "从来不会，技术到位什么都不怕", scores: { E: 3, P: 2, N: 1 } }
        ]
    },
    // 模块2：发球与接发（权重25%·核心模块）
    {
        module: "第二模块：发球与接发",
        type: "core",
        text: "你的发球得分率大概是多少？",
        options: [
            { text: "50%以上，发球是我的主要得分手段", scores: { T: 3, J: 3, E: 2 } },
            { text: "30%-50%，能创造不少抢攻机会", scores: { N: 3, T: 2, J: 2 } },
            { text: "10%-30%，主要是不让对手抢攻", scores: { S: 3, I: 2, F: 2 } },
            { text: "10%以下，经常被对手直接抢攻", scores: { F: 3, P: 2, I: 2 } }
        ]
    },
    {
        module: "第二模块：发球与接发",
        type: "core",
        text: "你最擅长发什么球？",
        options: [
            { text: "转不转发球，变化多端", scores: { N: 3, T: 2, I: 2 } },
            { text: "侧上旋发球，速度快顶得难受", scores: { E: 3, T: 2, J: 2 } },
            { text: "侧下旋发球，旋转强容易搓高", scores: { S: 3, J: 2, I: 2 } },
            { text: "奔球，直接偷袭对手反手", scores: { P: 3, E: 2, T: 1 } }
        ]
    },
    {
        module: "第二模块：发球与接发",
        type: "core",
        text: "接发球时你最喜欢用什么方式？",
        options: [
            { text: "摆短，控制对手不让他上手", scores: { S: 3, J: 2, I: 2 } },
            { text: "挑打，主动进攻抢先上手", scores: { E: 3, T: 2, P: 2 } },
            { text: "拧拉，全台拧拉直接相持", scores: { N: 3, T: 2, E: 2 } },
            { text: "搓长，退台跟他打相持", scores: { I: 3, F: 2, S: 2 } }
        ]
    },
    {
        module: "第二模块：发球与接发",
        type: "secondary",
        text: "遇到一个你从没见过的怪球，你会？",
        options: [
            { text: "先轻搓一个，试试旋转", scores: { S: 3, I: 2, J: 2 } },
            { text: "直接挑打，赌一把", scores: { E: 3, P: 2, T: 1 } },
            { text: "观察对手动作，判断旋转", scores: { N: 3, T: 2, I: 2 } },
            { text: "随便接，接过去就行", scores: { F: 3, P: 2, E: 1 } }
        ]
    },
    {
        module: "第二模块：发球与接发",
        type: "secondary",
        text: "你会故意发失误球打乱对手节奏吗？",
        options: [
            { text: "经常会，这是战术的一部分", scores: { T: 3, N: 2, E: 2 } },
            { text: "偶尔会，关键分的时候用", scores: { J: 3, T: 2, N: 1 } },
            { text: "很少会，尽量发好每一个球", scores: { S: 3, I: 2, F: 2 } },
            { text: "从来不会，发失误会影响自己", scores: { F: 3, I: 2, J: 1 } }
        ]
    },
    {
        module: "第二模块：发球与接发",
        type: "secondary",
        text: "你觉得发球最重要的是什么？",
        options: [
            { text: "旋转强，让对手判断错误", scores: { N: 3, I: 2, F: 2 } },
            { text: "落点刁，发到对手最难受的地方", scores: { T: 3, J: 2, S: 2 } },
            { text: "速度快，让对手反应不过来", scores: { E: 3, P: 2, T: 1 } },
            { text: "变化多，让对手摸不清规律", scores: { P: 3, N: 2, E: 2 } }
        ]
    },
    // 模块3：相持逻辑（权重25%·核心模块）
    {
        module: "第三模块：相持逻辑",
        type: "core",
        text: "相持中你最喜欢打哪个落点？",
        options: [
            { text: "反手位，压住对手不让他侧身", scores: { J: 3, S: 2, T: 2 } },
            { text: "正手位，用正手解决问题", scores: { E: 3, T: 2, P: 2 } },
            { text: "追身位，破坏对手进攻节奏", scores: { N: 3, T: 2, J: 2 } },
            { text: "两个大角度，调动对手跑起来", scores: { P: 3, E: 2, N: 2 } }
        ]
    },
    {
        module: "第三模块：相持逻辑",
        type: "core",
        text: "你是先上手还是等对手先上手？",
        options: [
            { text: "我先上手，能进攻绝不防守", scores: { E: 3, T: 2, P: 2 } },
            { text: "等他先上手，我打防守反击", scores: { I: 3, S: 2, F: 2 } },
            { text: "看情况，有机会就进攻", scores: { T: 3, N: 2, J: 2 } },
            { text: "随便，打起来再说", scores: { F: 3, P: 2, E: 1 } }
        ]
    },
    {
        module: "第三模块：相持逻辑",
        type: "core",
        text: "连续拉了3板对手都防回来了，你会？",
        options: [
            { text: "继续拉，加大力量和旋转", scores: { E: 3, T: 2, J: 2 } },
            { text: "变线，打对手的空档", scores: { N: 3, T: 2, P: 2 } },
            { text: "吊一个高球，改变节奏", scores: { I: 3, S: 2, F: 2 } },
            { text: "发力冲，赌一把能打死", scores: { P: 3, E: 2, T: 1 } }
        ]
    },
    {
        module: "第三模块：相持逻辑",
        type: "secondary",
        text: "中远台相持时你的优势是？",
        options: [
            { text: "力量大，能拉出很冲的球", scores: { E: 3, T: 2, J: 2 } },
            { text: "旋转强，弧圈球很顶", scores: { N: 3, I: 2, F: 2 } },
            { text: "速度快，衔接非常流畅", scores: { S: 3, J: 2, T: 2 } },
            { text: "防守好，能防住对手进攻", scores: { I: 3, F: 2, S: 2 } }
        ]
    },
    {
        module: "第三模块：相持逻辑",
        type: "secondary",
        text: "你能连续拉多少板不失误？",
        options: [
            { text: "10板以上，能打多拍相持", scores: { J: 3, S: 2, I: 2 } },
            { text: "5-10板，基本能保证连续", scores: { T: 3, N: 2, E: 2 } },
            { text: "3-5板，超过就容易失误", scores: { E: 3, P: 2, T: 1 } },
            { text: "1-3板，只能打一板过", scores: { P: 3, E: 2, F: 1 } }
        ]
    },
    {
        module: "第三模块：相持逻辑",
        type: "secondary",
        text: "你觉得相持中最重要的是什么？",
        options: [
            { text: "力量，一力降十会", scores: { E: 3, T: 2, P: 2 } },
            { text: "旋转，旋转是乒乓球的灵魂", scores: { N: 3, I: 2, F: 2 } },
            { text: "落点，打对手最难受的地方", scores: { T: 3, J: 2, S: 2 } },
            { text: "速度，天下武功唯快不破", scores: { S: 3, E: 2, J: 1 } }
        ]
    },
    // 模块4：战术应变（权重20%）
    {
        module: "第四模块：战术应变",
        type: "secondary",
        text: "0:3落后时你会？",
        options: [
            { text: "改变战术，尝试不同打法", scores: { N: 3, T: 2, P: 2 } },
            { text: "坚持自己的打法，相信能追回来", scores: { J: 3, S: 2, I: 2 } },
            { text: "放手一搏，怎么凶怎么打", scores: { E: 3, P: 2, T: 1 } },
            { text: "无所谓，反正已经落后了", scores: { F: 3, P: 2, I: 1 } }
        ]
    },
    {
        module: "第四模块：战术应变",
        type: "secondary",
        text: "遇到一个你从来没赢过的对手，你会？",
        options: [
            { text: "研究他的打法，制定针对性战术", scores: { T: 3, N: 2, J: 2 } },
            { text: "正常打，发挥出自己水平就行", scores: { S: 3, I: 2, F: 2 } },
            { text: "拼了，能赢一分是一分", scores: { E: 3, P: 2, T: 1 } },
            { text: "找借口不跟他打", scores: { F: 3, I: 2, P: 1 } }
        ]
    },
    {
        module: "第四模块：战术应变",
        type: "secondary",
        text: "对手摸清了你的打法，你会？",
        options: [
            { text: "立即变战术，打他措手不及", scores: { N: 3, P: 2, T: 2 } },
            { text: "坚持自己的打法，用实力说话", scores: { J: 3, S: 2, I: 2 } },
            { text: "尝试一些平时不用的技术", scores: { P: 3, E: 2, N: 1 } },
            { text: "慌了，不知道该怎么打了", scores: { F: 3, I: 2, S: 1 } }
        ]
    },
    {
        module: "第四模块：战术应变",
        type: "secondary",
        text: "你会根据不同对手用不同战术吗？",
        options: [
            { text: "会，每个对手打法都不同", scores: { T: 3, N: 2, J: 2 } },
            { text: "偶尔会，遇到特别难打的对手", scores: { J: 3, T: 2, S: 2 } },
            { text: "很少会，只用自己最擅长的", scores: { I: 3, S: 2, F: 2 } },
            { text: "不会，我打谁都是一个打法", scores: { P: 3, E: 2, F: 1 } }
        ]
    },
    {
        module: "第四模块：战术应变",
        type: "secondary",
        text: "你觉得战术在比赛中占多大比重？",
        options: [
            { text: "70%以上，战术比技术更重要", scores: { N: 3, T: 2, J: 2 } },
            { text: "50%，技术和战术各占一半", scores: { T: 3, S: 2, N: 2 } },
            { text: "30%，技术好什么战术都不怕", scores: { E: 3, P: 2, S: 1 } },
            { text: "10%以下，实力碾压一切", scores: { E: 3, F: 2, P: 1 } }
        ]
    },
    {
        module: "第四模块：战术应变",
        type: "secondary",
        text: "打了一个运气球得分，你会？",
        options: [
            { text: "举手示意，表示抱歉", scores: { F: 3, I: 2, S: 2 } },
            { text: "继续打下一个球，什么也不说", scores: { T: 3, J: 2, I: 2 } },
            { text: "庆祝一下，运气也是实力", scores: { E: 3, P: 2, T: 1 } },
            { text: "故意打一个失误还回去", scores: { F: 3, I: 2, J: 1 } }
        ]
    },
    // 模块5：心态与喜好（权重10%）
    {
        module: "第五模块：心态与喜好",
        type: "secondary",
        text: "打比赛时你最在意的是？",
        options: [
            { text: "输赢，我打球就是为了赢", scores: { T: 3, J: 2, E: 2 } },
            { text: "发挥，打出自己水平就行", scores: { I: 3, N: 2, F: 2 } },
            { text: "开心，享受比赛的过程", scores: { F: 3, E: 2, P: 2 } },
            { text: "别人的看法，不想打得太难看", scores: { F: 3, S: 2, I: 1 } }
        ]
    },
    {
        module: "第五模块：心态与喜好",
        type: "secondary",
        text: "连续失误丢分时你会？",
        options: [
            { text: "冷静分析原因，及时纠正", scores: { T: 3, N: 2, J: 2 } },
            { text: "深呼吸，调整自己的心态", scores: { I: 3, F: 2, S: 2 } },
            { text: "大喊一声，给自己打气", scores: { E: 3, P: 2, T: 1 } },
            { text: "急躁，越打越乱", scores: { P: 3, E: 2, F: 1 } }
        ]
    },
    {
        module: "第五模块：心态与喜好",
        type: "secondary",
        text: "你更喜欢打单打还是双打？",
        options: [
            { text: "单打，完全靠自己的实力", scores: { I: 3, T: 2, N: 2 } },
            { text: "双打，和队友配合的感觉好", scores: { E: 3, F: 2, J: 2 } },
            { text: "都喜欢，各有各的乐趣", scores: { F: 3, N: 2, P: 2 } },
            { text: "都不喜欢，就喜欢随便打打", scores: { P: 3, I: 2, F: 1 } }
        ]
    },
    {
        module: "第五模块：心态与喜好",
        type: "secondary",
        text: "你会在比赛后复盘吗？",
        options: [
            { text: "会，每次比赛后都认真复盘", scores: { J: 3, T: 2, N: 2 } },
            { text: "偶尔会，输了比赛才复盘", scores: { T: 3, I: 2, S: 2 } },
            { text: "很少会，打完就忘了", scores: { E: 3, P: 2, F: 2 } },
            { text: "从来不会，打球就是为了开心", scores: { F: 3, P: 2, E: 1 } }
        ]
    },
    {
        module: "第五模块：心态与喜好",
        type: "secondary",
        text: "你会为了提高球技专门训练吗？",
        options: [
            { text: "会，每周专门抽时间练球", scores: { J: 3, T: 2, N: 2 } },
            { text: "偶尔会，想起来就练一下", scores: { T: 3, S: 2, I: 2 } },
            { text: "不会，打球就是为了娱乐", scores: { F: 3, E: 2, P: 2 } },
            { text: "不会，打比赛就是最好的训练", scores: { E: 3, P: 2, T: 1 } }
        ]
    },
    {
        module: "第五模块：心态与喜好",
        type: "secondary",
        text: "球馆里来了一个新手，你会？",
        options: [
            { text: "主动教他，分享自己的经验", scores: { F: 3, E: 2, J: 2 } },
            { text: "跟他打几局，指点一下", scores: { T: 3, N: 2, S: 2 } },
            { text: "打自己的球，不管他", scores: { I: 3, S: 2, P: 2 } },
            { text: "虐他几局，找找自信", scores: { E: 3, P: 2, T: 1 } }
        ]
    }
];

// 16种乒乓球人格完整数据（无选手梗版）
const personalities = {
    "INTJ": {
        type: "战术算计王",
        tagline: "还没开打，他已经算完了所有可能性",
        coreTraits: "冷静、理性、爱琢磨，打个球能在脑子里演完整部兵法",
        playStyle: "用脑子打球的代表，不跟你拼蛮力，专打你最难受的地方",
        signatureMove: "假动作晃得你怀疑人生+精准线路算计",
        strengths: "战术意识甩同段位一条街，发球变化多，中远台相持稳",
        weaknesses: "想太多导致出手犹豫，反手基本是摆设，脚下像灌了铅",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，我太懂你这种人了！打个球比诸葛亮还能算，对手还没发球呢，你已经在脑子里把接下来5拍的线路都规划好了。在${score}分这个段位，你绝对是球馆里最聪明的那批人，别人都在靠本能瞎抡，你已经在打心理战了。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论（90%的人都看错了）</h4>
                <p class="text-gray-700">你总觉得自己"想太多"是缺点，但其实正是因为你爱琢磨，才让你用二流的技术打出了一流的成绩。你的脑子就是你最强大的武器，比任何暴力进攻都管用。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病（别不爱听）</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>反手就是个摆设</strong>：我敢打赌，你的反手除了搓球和挡球啥也不会。遇到半高球只能勉强撩一下，质量差得离谱，对手一板就给你拍死了。</li>
                <li><strong>正手只能打一板</strong>：第一板爆冲质量确实高，但只要对手防回来，你第二板肯定失误。脚下根本不动，全靠胳膊够着打。</li>
                <li><strong>关键球想太多</strong>：9:9的时候别人都在想"干就完了"，你在想"我发短球他会摆短还是挑打？摆短我抢冲斜线还是直线？"，结果想多了直接发球失误。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划（照着做就行）</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：先把反手救回来</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>每次打球先练20分钟反手快拨，别发力，能连续打20个不失误就行</li>
                <li>练10分钟反手撕，不用追求质量，能撕上台就成功</li>
                <li>别再跟人打比赛了，先把反手练出个样子再说</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：练正手连续拉</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>找个球友给你喂多球，练2-3板连续拉，别发力，先保证上台</li>
                <li>每次打完一板都要小跳一下回到原位，别站死在那里</li>
                <li>重点练侧身之后的还原，这是你最大的问题</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：关键球训练</strong>：每次打球专门练10:10以后的球，告诉自己"别想那么多，打最有把握的球"。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：转不转发球抢攻（你的杀手锏）</strong></p>
            <ol class="text-gray-600 mb-4 space-y-1 list-decimal pl-6">
                <li>发对手反手位不转球，一定要发低，让他只能搓回来</li>
                <li>他一搓你就侧身正手抢冲斜线，这板一定要冲死</li>
                <li>如果他敢挑打，你就反手快拨直线，打他个措手不及</li>
            </ol>
            <p class="text-gray-600 mb-4"><strong>套路2：压反手转正手</strong></p>
            <ol class="text-gray-600 mb-4 space-y-1 list-decimal pl-6">
                <li>先连续压对手反手3板，别变线</li>
                <li>等他站位偏反手的时候，突然变线到他正手大角度</li>
                <li>他跑过去救球肯定质量不高，你再一板冲死</li>
            </ol>
            <p class="text-gray-600 mb-6"><strong>套路3：相持变节奏</strong>：先跟对手打快节奏相持，突然放慢节奏挂一个高吊弧圈，他肯定会扑上来抢攻，这时候你再快撕他反手，屡试不爽。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐（别乱花钱）</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内：别瞎折腾</strong>：银河U2底板+正手狂飙3 39度+反手729焦点3，够用了，比那些花里胡哨的强多了。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元：性价比之选</strong>：蝴蝶科贝尔底板+正手省狂3 39度+反手蝴蝶罗泽娜，适合你这种全面型打法。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上：一步到位</strong>：蝴蝶维斯卡利亚底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，业余球友的终极配置。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>技术有明显短板</strong>。别再研究那些花里胡哨的战术了，先把反手和正手连续拉练好。只要这两个技术练出来了，你闭着眼睛都能上${score+150}分。记住一句话：业余打球，技术是1，战术是后面的0，没有1，再多的0也没用。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，或者你的打法正在转型期。</p>
        `
    },
    "INTP": {
        type: "理论大明白",
        tagline: "讲起技术头头是道，打起来一塌糊涂",
        coreTraits: "理性、爱分析、讲道理，打个球能给你写出一篇论文",
        playStyle: "理论王者，实战青铜，说起来谁都打不过，打起来谁都打不过",
        signatureMove: "精准弱点攻击+逻辑推导式打球",
        strengths: "一眼就能看出对手的破绽，技术动作标准得像教科书",
        weaknesses: "实战经验为零，遇到怪球直接懵，出手比蜗牛还慢",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，我太了解你了！你就是球馆里的"人形乒乓球百科"，谁的动作有问题你一眼就能看出来，讲起战术来头头是道，比专业教练还专业。但一到自己上场，就完全不是那么回事了，明明知道该怎么打，就是打不出来。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"实战经验少"是缺点，但其实正是因为你懂理论，才让你比那些只会瞎打的人进步快得多。只要你多打比赛，把理论和实践结合起来，你的球技会呈指数级增长。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>实战经验严重不足</strong>：你平时就喜欢跟人练定点，一打比赛就懵。遇到长胶、生胶这些怪胶，直接缴械投降。</li>
                <li><strong>出手太慢</strong>：球过来了，你还在脑子里想"这个球应该用正手还是反手？应该拉还是搓？"，等你想明白了，球早就落地了。</li>
                <li><strong>应变能力差</strong>：只要对手不按你的"剧本"打球，你就直接不会了。明明平时练得好好的技术，一到比赛就用不出来。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：别练了，去打比赛</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>这个月不要练任何技术，天天去球馆打比赛</li>
                <li>跟不同风格的对手打，尤其是那些你平时最不想打的怪球手</li>
                <li>输了没关系，重要的是积累经验，知道遇到不同的打法该怎么应对</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：练反应速度</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>让球友给你喂不定点球，你不用发力，能接上就行</li>
                <li>练接发球，各种旋转、各种落点的球都要接</li>
                <li>告诉自己：别想那么多，球来了先打出去再说</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：实战应用</strong>：把你平时研究的战术，在比赛中刻意运用，不管输赢，用出来就算成功。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：弱点持续攻击</strong>：一旦发现对手的某个弱点，就往死里打这个点，别变线，直到他崩溃为止。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：打节奏差</strong>：一板快一板慢，一板重一板轻，打乱对手的节奏，让他怎么打怎么不舒服。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：发球抢攻</strong>：就练一个发球，比如侧下旋发球，发熟了之后，只要对手搓回来，你就一板冲死。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：斯蒂卡EG底板+正手狂飙3 39度+反手729天翼，适合练球。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡OC底板+正手省狂3 39度+反手蝴蝶T64，弧圈球质量高。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶波尔ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶D05，全面均衡。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>理论和实践脱节</strong>。别再整天研究技术理论了，多打比赛，多积累实战经验。记住一句话：乒乓球是打出来的，不是想出来的。只要你多打比赛，把理论和实践结合起来，3个月上${score+180}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ENTJ": {
        type: "全台爆冲王",
        tagline: "能一板打死，绝对不打第二板",
        coreTraits: "自信、强势、有霸气，打球就是为了赢，输了会难受一整天",
        playStyle: "暴力进攻型，一板爆冲打死你，不跟你多废话",
        signatureMove: "全台无死角进攻+连续爆冲",
        strengths: "进攻火力猛，心理素质好，关键时刻敢下手",
        weaknesses: "失误比得分还多，防守基本为零，耐心为负数",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里最靓的仔！你的正手爆冲绝对是同段位最顶的，一板下去，对手连球都摸不着。跟你打球，对手只有捡球的份，那种压制感真的太爽了。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"失误多"是缺点，但其实正是因为你敢进攻，才让你赢了很多本来赢不了的比赛。你的进攻威胁就是你最大的武器，对手跟你打球，心理压力比你大得多。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>失误率高得离谱</strong>：10个球你能打死5个，但也能失误5个，等于白打。很多球其实不用那么发力，轻轻一拉就有了。</li>
                <li><strong>根本不会防守</strong>：你只会进攻，不会防守。对手只要防住你前3板，你就直接慌了，接下来全是失误。</li>
                <li><strong>一点耐心都没有</strong>：打不了3板就想一板打死对手，结果越急越失误，越失误越急，陷入恶性循环。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：学会防守</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>每次打球先练20分钟防守，让球友爆冲你，你能防回去就行</li>
                <li>练反手挡球和正手防弧圈，不用发力，能把球挡回去就成功</li>
                <li>告诉自己：能防住对手3板，你就赢了一半</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：控制进攻力量</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>进攻的时候只用7成力，不要发全力</li>
                <li>先保证上台，再追求质量</li>
                <li>多打连续进攻，不要总想着一板打死</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：培养耐心</strong>：跟对手打多拍相持，能打10板绝不打5板，磨练自己的耐心。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：发球抢攻三板斧</strong>：发短球→抢攻→连续爆冲，这是你最擅长的，继续发扬光大。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：压反手转正手</strong>：先压住对手反手，等他站位偏了，突然变线到正手，然后一板冲死。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：追身球战术</strong>：多打对手追身球，破坏他的进攻节奏，他一慌就会失误。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河T-2底板+正手狂飙3 40度+反手729焦点3，进攻给力。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡CLCR底板+正手省狂3 40度+反手蝴蝶T05，经典进攻配置。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶张继科ALC底板+正手蓝海绵狂飙3 40度+反手蝴蝶T05，暴力进攻首选。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>只会进攻不会防守</strong>。记住一句话：进攻赢掌声，防守赢比赛。只要你学会了防守，能防住对手的进攻，你的胜率会直接翻倍，3个月上${score+200}分不是梦。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
"ENTP": {
        type: "随缘摆烂人",
        tagline: "认真打不一定赢，摆烂一定输不了",
        coreTraits: "佛系、随性、爱折腾，什么怪技术都想试试",
        playStyle: "怪球手，打球不按常理出牌，能把对手打懵",
        signatureMove: "非常规球路+出其不意的神仙球",
        strengths: "反应快，手感好，能打出很多不可思议的球",
        weaknesses: "基本功稀烂，失误比神仙球还多，状态起伏比过山车还大",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"快乐源泉"！跟你打球永远不会无聊，你总能打出一些让人拍案叫绝的神仙球，什么胯下击球、背后击球，你样样都会。看你打球就像看表演一样，太精彩了。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"基本功差"是缺点，但其实正是因为你没有被固定的动作束缚，才让你有了超强的手感和创造力。你的即兴发挥能力是很多人练一辈子都练不出来的。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>基本功稀烂</strong>：你的正手攻球动作像抽风，反手攻球像炒菜，全靠手感瞎蒙。</li>
                <li><strong>失误率太高</strong>：10个球你能打出1个神仙球，但也能失误8个，等于白给。</li>
                <li><strong>没有固定打法</strong>：今天学这个，明天学那个，结果谁都没学成，变成了四不像。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：从头练基本功</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>这个月不要打比赛，不要练任何花里胡哨的技术</li>
                <li>每天就练正手攻球和反手攻球，每个动作练1000次</li>
                <li>把动作练标准，把稳定性提上来</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：练发球抢攻</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>就练一个发球，比如侧上旋发球，发熟了为止</li>
                <li>练发球后的抢攻，形成固定的套路</li>
                <li>不要总想着打神仙球，先把该打上的球打上</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：形成自己的打法</strong>：找到适合自己的打法，坚持下去，不要今天学这个明天学那个。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：突然变线</strong>：在相持中突然变线到对手的空档，打他一个措手不及。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：假动作</strong>：利用假动作迷惑对手，让他判断错误，然后你再进攻。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：反手发球</strong>：用反手发各种旋转的球，打乱对手的接发球节奏。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河N-10底板+正手729-2+反手729天翼，便宜耐用。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶孔令辉纯木底板+正手狂飙3 39度+反手蝴蝶罗泽娜，手感好。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶水谷隼ZLC底板+正手蝴蝶T05+反手蝴蝶T64，适合变化多的打法。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>基本功太差</strong>。别再整天琢磨那些花里胡哨的技术了，先把正、反手基础攻球定型。你的绝佳手感只要配上稳定动作，上限会远超同球友，3个月稳定涨分非常轻松。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "INFJ": {
        type: "细腻控台师",
        tagline: "心思细腻观察力极强，默默拿捏对手习惯",
        coreTraits: "内敛敏感、擅长观察、不爱硬碰硬，习惯用节奏拉扯对手",
        playStyle: "稳扎稳打型，不主动发力抢冲，靠细微落点与旋转变化消耗对手",
        signatureMove: "精细摆短+长短球组合调动",
        strengths: "接发球判断准、台内小球细腻、失误极少，耐力强多拍不慌",
        weaknesses: "进攻主动性不足，不敢主动起板，遇到暴力冲球容易被动退守",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、真心话总结</h3>
            <p class="text-gray-600 mb-6">你打球从来不靠蛮力碾压，全靠眼睛看细节，打几局就能摸清对手发球习惯、站位漏洞。台内小球处理是你的强项，对手很难轻易抢先上手。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">核心优势解读</h4>
                <p class="text-gray-700">低失误率是你的天然护城河，业余对局里稳定远比爆发力吃香，只是你习惯性过于保守，白白丢掉大量得分机会。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、三大核心短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>主动起板意愿极低</strong>，永远等着对手先失误，不会主动制造进攻机会</li>
                <li><strong>中远台相持无力</strong>，被对手拉开站位后只能被动防守，没法反拉反攻</li>
                <li><strong>关键分不敢加质量</strong>，越到赛点越保守，摆短过度容易冒高被直接扣杀</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、三个月针对性训练方案</h3>
            <p><strong>第1个月：强制练习主动挑打、拧拉</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>每一组接发球必须至少3次主动上手，禁止全程搓球</li>
                <li>固定练习反手拧拉斜线，不求暴力，只求稳定上台</li>
            </ul>
            <p><strong>第2个月：中远台反拉定型</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>多球训练对手连续拉冲，练习退台反拉弧圈</li>
                <li>改掉原地站死习惯，每一板打完即时脚步还原</li>
            </ul>
            <p><strong>第3个月：关键分战术加压</strong></p>
            <p class="text-gray-600">比分胶着时刻主动发长球顶身位，强行逼迫进入相持，不再一味台内纠缠。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、三套实战固定套路</h3>
            <p><strong>套路1：长短组合拉扯</strong>连续两板摆短，突然劈长底线，逼对手仓促起板失误</p>
            <p><strong>套路2：反手底线牵制</strong>持续压对手反手大角度，等待对手侧身露出正手空档再变线</p>
            <p><strong>套路3：转不转迷惑接发</strong>轻微调整触球厚薄制造旋转差，让对手搓球冒高直接正手抢冲</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材搭配建议</h3>
            <p>500元内：斯蒂卡CL纯木+正手普狂39°+反手729闪现</p>
            <p>1000-1500元：蝴蝶inner alc+正手省狂+反手罗泽娜</p>
            <p>2000元以上：林昀儒alc，极致台内控制+反手稳定拧拉适配你的打法</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、涨分瓶颈解析</h3>
            <p class="text-gray-600">当前${score}分卡点根源是过于保守。你的小球功底已经足够扎实，只需要补上主动进攻这一环，稳定性+进攻威胁兼备，分数会稳步上涨${score+120}分以上。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。参考自身实际打法调整训练方向即可。</p>
        `
    },
    "INFP": {
        type: "佛系快乐球友",
        tagline: "输赢无所谓，打球只为放松消遣",
        coreTraits: "随性温和、不爱较真、讨厌高强度对抗，打球主打开心解压",
        playStyle: "随缘接球流，不刻意练技术，怎么舒服怎么打，几乎不研究战术",
        signatureMove: "随缘回球、轻挡轻搓，不发力不抢攻",
        strengths: "心态极好，不会因为丢球急躁，打球松弛感强，不容易受伤",
        weaknesses: "没有固定技术框架，完全无战术意识，遇到认真竞技对手毫无还手之力",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、心里话总结</h3>
            <p class="text-gray-600 mb-6">你来球馆纯粹是消遣解压，输赢根本不会放在心上。别人为一局比分较劲的时候，你只在乎打球出汗放松，球友都愿意跟你搭档，没有竞技压力。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">专属优势解读</h4>
                <p class="text-gray-700">绝佳心态是你的独有优势，不会因为连续丢分崩盘，只是缺少竞技诉求，技术长期原地踏步，很难提升段位。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、现存明显短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>从不主动打磨技术</strong>，多年打球动作依旧零散，没有成型框架</li>
                <li><strong>毫无战术概念</strong>，只会被动接球，不会主动调动对手落点</li>
                <li><strong>不愿主动上手进攻</strong>，全程搓挡防守，任由对手持续压制</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、轻量化训练方案（不牺牲打球乐趣）</h3>
            <p><strong>第1个月：定型基础小动作</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>每次打球抽出10分钟定点正手攻球，不用发力，只求动作固定</li>
                <li>不用强迫自己多练，不占用休闲打球时间</li>
            </ul>
            <p><strong>第2个月：学会简单落点调动</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>接球有意识交替打对手正反手，不用强求得分</li>
            </ul>
            <p><strong>第3个月：偶尔尝试主动起板</strong></p>
            <p class="text-gray-600">遇到短球轻轻挑打一板，不用追求质量，体验主动进攻即可。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、休闲友好型实用套路</h3>
            <p><strong>套路1：稳搓底线</strong>持续把球搓到对手底线深处，逼迫对手起板失误</p>
            <p><strong>套路2：长短交替</strong>短球摆短牵制，偶尔劈长打乱站位</p>
            <p><strong>套路3：借力挡防</strong>对手发力拉冲直接借力挡斜线，省心省力</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、舒适向器材推荐</h3>
            <p>500元内：银河U1+普狂39°+729天翼，持球柔和不费力气</p>
            <p>1000元左右：斯蒂卡OC纯木，持球感强，防守容错率高</p>
            <p>2000元以上：林昀儒INNER ALC，控制轻松，不用主动发大力</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、个人定位建议</h3>
            <p class="text-gray-600">你本来就不以竞技涨分为目标，不必强迫自己高强度训练。稍微规范基础动作，既能继续享受打球乐趣，又不会随便被碾压，保持${score}分休闲段位刚刚好。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。打球开心永远排在第一位。</p>
        `
    },
    "ENFJ": {
        type: "球馆组织者",
        tagline: "热心张罗球局，兼顾所有人打球体验",
        coreTraits: "外向热心、擅长协调、照顾新手情绪，乐于分享技术经验",
        playStyle: "均衡全面型，攻守兼备，打球懂得留情面，不会全力碾压新手",
        signatureMove: "稳健相持+落点合理分配",
        strengths: "球路均衡无明显短板，心态稳定，擅长观察对手情绪，临场调整快",
        weaknesses: "竞技时容易心软留手，关键分不够决绝，进攻爆发力不足",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、个人画像总结</h3>
            <p class="text-gray-600 mb-6">整个球馆的球局大多靠你牵头组织，新手没人搭档你主动陪练，高手切磋你帮忙凑局。打球实力够用，还懂得照顾别人感受，人缘极好。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">优势解析</h4>
                <p class="text-gray-700">均衡全面的球路让你适配任何对手，人情世故通透，哪怕输球也不会闹别扭，长期拥有稳定球搭子。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、影响竞技上限的短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>习惯性手下留情</strong>，遇到熟人、新手不敢全力进攻，错失得分机会</li>
                <li><strong>缺少一板终结能力</strong>，相持只能慢慢拉扯，没有致命爆冲杀手锏</li>
                <li><strong>分心顾及他人感受</strong>，比赛专注力容易被场外因素分散</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、三个月提升计划</h3>
            <p><strong>第1个月：单独练一板强攻技术</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>固定练习正手侧身爆冲，专门作为关键分终结手段</li>
            </ul>
            <p><strong>第2个月：竞技模式划分清晰</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>娱乐局正常留手，正式比赛抛开情面全力出手</li>
            </ul>
            <p><strong>第3个月：强化专注度</strong></p>
            <p class="text-gray-600">对局全程只盯球，不关注旁人交流，提升单局专注力。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、通用实战套路</h3>
            <p><strong>套路1：连续压反手后突袭正手大角</strong></p>
            <p><strong>套路2：短球控制后伺机侧身抢冲</strong></p>
            <p><strong>套路3：防守反击借力变线</strong></p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p>500元内：银河博纯木+省狂39°+729闪现</p>
            <p>千元档：蝴蝶科贝尔，攻守均衡容错高</p>
            <p>高端款：维斯卡利亚ALC，全能适配各类打法</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈建议</h3>
            <p class="text-gray-600">你卡在${score}分不是技术不够，是竞技决心不足。比赛放下人情顾虑，加上专属终结板，轻松突破${score+130}分，同时不影响球馆人缘。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。热心打球的人运气都不会差。</p>
        `
    },
    "ENFP": {
        type: "即兴快乐进攻流",
        tagline: "打法天马行空，每一局都不一样",
        coreTraits: "活泼外向、想象力强、讨厌一成不变，打球主打即兴发挥",
        playStyle: "无固定套路进攻型，临场随机变线变节奏，全程充满变数",
        signatureMove: "即兴变线、快慢节奏切换、非常规落点偷袭",
        strengths: "节奏变化极多，对手很难适应，上手速度快，临场调整灵活",
        weaknesses: "动作稳定性差，重复多拍相持容易连续失误，缺少标准化套路",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、画像解读</h3>
            <p class="text-gray-600 mb-6">你从来不按固定套路打球，这一局主打快攻，下一局就换成旋转拉扯，对手永远猜不到你下一板回球线路，打球观赏性拉满。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">独特优势</h4>
                <p class="text-gray-700">天然节奏变化能力是你的王牌，同水平球友很难快速适应你的多变球路，开局就能建立心理优势。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、核心短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>稳定性波动极大</strong>，手感好连续得分，手感差连续送分</li>
                <li><strong>没有成熟固定套路</strong>，遇到稳健防守型对手容易无计可施</li>
                <li><strong>多板相持耐力不足</strong>，几板打不死就心态浮躁</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、训练规划</h3>
            <p><strong>第1个月：固化一套核心发球抢攻套路</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>选定一套侧下旋发球，打磨成型作为保底得分手段</li>
            </ul>
            <p><strong>第2个月：练习多板连续拉</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>强制自己至少相持5板以上再寻求变线，不急于一板终结</li>
            </ul>
            <p><strong>第3个月：收束即兴发挥比例</strong></p>
            <p class="text-gray-600">7成常规套路+3成即兴变化，兼顾稳定与迷惑性。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、实战套路组合</h3>
            <p><strong>套路1：快奔球偷袭后连续压反手</strong></p>
            <p><strong>套路2：慢摆短衔接突然劈长</strong></p>
            <p><strong>套路3：相持中忽快忽慢打乱节奏</strong></p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材搭配</h3>
            <p>500元内：银河T11+狂3 39°</p>
            <p>千元档：波尔ALC，形变充足适配多变手法</p>
            <p>高端：水谷隼ZLC，节奏切换容错高</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、涨分分析</h3>
            <p class="text-gray-600">${score}分瓶颈在于稳定性缺失，保留你的多变优势，叠加一套保底固定战术，分数可以稳定上涨${score+140}分，观赏性和竞技性兼顾。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ISTJ": {
        type: "稳健保守实干派",
        tagline: "一招一式严格规范，绝不随意乱打",
        coreTraits: "严谨自律、循规蹈矩、执行力强，严格按照标准动作打球",
        playStyle: "标准教科书式稳守反击，动作规范、回球落点规整，极少主动失误",
        signatureMove: "稳定防守、定点线路回击、标准化发球套路",
        strengths: "失误率极低、动作标准规范、多拍相持稳定性极强，基本功扎实",
        weaknesses: "战术变通极差，不会临场变招，只会固守一套打法，缺少突袭手段",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、个人特点</h3>
            <p class="text-gray-600 mb-6">你的每一个挥拍动作都严格对标教学视频，不自创野路子，长期定点训练打磨出扎实基本功，很少主动送失误，靠稳定就能赢下多数佛系对手。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">优势解读</h4>
                <p class="text-gray-700">扎实基本功是下限保障，哪怕状态一般也不会大比分崩盘，下限极高。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、明显短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>不懂临场变通</strong>，一套打法从头打到尾，对手适应后轻松克制</li>
                <li><strong>缺少偷袭手段</strong>，永远按常规线路回球，毫无突然性</li>
                <li><strong>进攻侵略性不足</strong>，只会稳拉稳防，很难快速拉开比分</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、三个月改造计划</h3>
            <p><strong>第1个月：新增一套偷袭奔球发球</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>常规发球和奔球穿插使用，增加突然性</li>
            </ul>
            <p><strong>第2个月：练习主动变线</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>连续2板同一落点后必须主动变一次线路</li>
            </ul>
            <p><strong>第3个月：适度加强进攻力度</strong></p>
            <p class="text-gray-600">关键分适度加力爆冲，不再一味稳拉。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、适配套路</h3>
            <p><strong>套路1：稳压反手伺机变正手大角</strong></p>
            <p><strong>套路2：常规侧下旋+奔球交替发球打乱预判</strong></p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p>500元内：斯蒂卡CLCR纯木，经典稳扎底板</p>
            <p>千元档：蝴蝶科贝尔</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈分析</h3>
            <p class="text-gray-600">${score}分是你的稳定下限，只要补上变通和突袭能力，不用改动扎实基本功，就能稳步冲到${score+110}分。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ISFJ": {
        type: "贴心陪练型球友",
        tagline: "愿意迁就搭档节奏，打球优先照顾对方体验",
        coreTraits: "温和体贴、迁就他人、不爱争抢胜负，习惯配合搭档节奏打球",
        playStyle: "防守牵制型，主动给搭档创造上手机会，不独自强行进攻抢分",
        signatureMove: "稳妥搓球、轻挡过渡、给搭档让出进攻空档",
        strengths: "双打适配度极高，接球稳妥不失误，球风友善，搭档体验感极佳",
        weaknesses: "单打主动得分能力薄弱，习惯性迁就对手，不敢主动发起连续进攻",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、画像总结</h3>
            <p class="text-gray-600 mb-6">双打永远最抢手的搭档，主动回球给队友留出舒适进攻位置，从不抢出手，哪怕单打也习惯性礼让，很少全力跟对手死拼比分。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">独有优势</h4>
                <p class="text-gray-700">容错率高、配合意识强，球馆里固定搭档源源不断，不愁没人组队打球。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、单打短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>单打缺少进攻欲望</strong>，全程被动过渡，任由对手持续压制</li>
                <li><strong>没有专属得分技术</strong>，只能依靠对手失误拿分</li>
                <li><strong>不敢主动侧身强攻</strong>，错失大量上手机会</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、分场景提升方案</h3>
            <p><strong>双打：保持原有风格不变</strong></p>
            <p><strong>单打：强制主动上手训练</strong></p>
            <ul class="list-disc pl-6 text-gray-600">
                <li>每一局至少5次主动拧拉、挑打抢先上手</li>
                <li>单独打磨一套正手抢冲作为单打得分手段</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、器材与套路</h3>
            <p>底板优选持球柔和的纯木底板，防守过渡轻松；单打固定发球抢冲一套套路即可。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、定位建议</h3>
            <p class="text-gray-600">你不需要强行改变友善球风，只需要单独储备一套单打进攻手段，既能继续当好黄金双打搭档，单打段位也能突破${score+100}分。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ESTJ": {
        type: "赛场指挥官",
        tagline: "战术规划清晰，严格执行既定打法",
        coreTraits: "果断强势、规划性强、执行力拉满，赛前就定好完整对局战术",
        playStyle: "战术执行型强攻打法，严格按照预设线路进攻，掌控比赛节奏",
        signatureMove: "成套发球抢攻、定点压制线路、分阶段布局比分",
        strengths: "战术执行力极强，比分把控能力好，落后也不乱打法，心理素质过硬",
        weaknesses: "预设战术被破解后应变迟缓，不肯临时调整打法，容易一条路走到黑",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、特点总结</h3>
            <p class="text-gray-600 mb-6">开局就规划好每一分怎么打，发球、压制线路、抢攻时机全部提前定好，严格落地执行，对局掌控力极强，擅长把控关键分。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">优势解析</h4>
                <p class="text-gray-700">成套战术稳定性极高，常规对局很难被打乱节奏，比分领先时几乎不会被翻盘。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>战术被克制后不肯变通</strong>，固执沿用原定打法持续丢分</li>
                <li><strong>灵活变化太少</strong>，对手熟悉你的固定套路后轻松预判回球</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、优化方案</h3>
            <ul class="list-disc pl-6 text-gray-600">
                <li>每套主力战术配套一套备用变招，连续丢2分立刻切换</li>
                <li>预留3成临场调整空间，不完全拘泥赛前规划</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、涨分预判</h3>
            <p class="text-gray-600">原有战术体系已经成熟，仅补充应变备选方案，就能突破${score+125}分上限。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ESFJ": {
        type: "氛围担当型球友",
        tagline: "活跃球局气氛，兼顾所有人体验",
        coreTraits: "热情外向、擅长活跃气氛、照顾全场所有人情绪，热衷组队约球",
        playStyle: "均衡中庸打法，不强势碾压，也不被动挨打，打球重在互动交流",
        signatureMove: "均衡相持、友好落点、适度让分不碾压新手",
        strengths: "球路人见人爱，球局源源不断，双打配合默契，心态永远平稳",
        weaknesses: "竞技进取心偏弱，不愿全力拼杀，缺少杀手锏，关键分冲劲不足",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、画像</h3>
            <p class="text-gray-600 mb-6">球馆气氛组担当，冷场时主动聊天带动氛围，主动邀约新手组队，从不碾压新人，所有人都愿意跟你打球。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">优势</h4>
                <p class="text-gray-700">稳定的球搭子和球局不用发愁，长期有固定练球对手，基本功不会退步。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、竞技短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>主动进攻意愿不强</strong>，习惯性收力，无法打出致命一击</li>
                <li><strong>没有专属得分杀手锏</strong>，只能依靠稳定慢慢磨分</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、折中提升方案</h3>
            <p>娱乐局保持原有风格；正式比赛放开限制全力进攻，单独打磨一套抢冲杀手锏即可。</p>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、定位建议</h3>
            <p class="text-gray-600">不用改变热情友善的风格，只区分娱乐和竞技模式，段位轻松上涨，人缘也不受影响。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ISTP": {
        type: "实战手感怪才",
        tagline: "不讲理论纯靠手感，临场随机拆解球路",
        coreTraits: "动手能力极强、不爱空谈理论、观察力敏锐，临场快速拆解对手球路",
        playStyle: "直觉手感流，不背诵成套战术，靠即时观察随机调整回球方式",
        signatureMove: "借力变线、非常规回球、瞬间看穿对手漏洞",
        strengths: "临场反应极快，任何陌生打法都能快速适应，借力防守反击效率极高",
        weaknesses: "没有标准化固定动作，高段位多板连续相持稳定性不足，无法系统化提升",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、特点总结</h3>
            <p class="text-gray-600 mb-6">别人聊技术理论你从不插嘴，上场仅凭眼睛观察两板，立刻就能摸清对手旋转和弱点，随手就能回出克制线路，天生实战型选手。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">天赋优势</h4>
                <p class="text-gray-700">瞬时读球能力远超常人，初次交手就能快速适应陌生打法，不存在被怪胶克制的问题。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、短板瓶颈</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>动作无标准化框架</strong>，手感起伏大，连续多板稳定性下滑</li>
                <li><strong>不会系统化打磨技术</strong>，段位涨到一定程度就触碰天花板</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、提升规划</h3>
            <ul class="list-disc pl-6 text-gray-600">
                <li>抽出少量时间规范正手连续拉基础动作，保留手感优势同时加固稳定性</li>
                <li>固定一套发球抢攻保底套路，不用完全抛弃临场即兴打法</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、涨分预判</h3>
            <p class="text-gray-600">你的读球天赋已经拉满，只补齐动作框架，轻松突破${score+160}分天花板。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ISFP": {
        type: "艺术感手感流",
        tagline: "追求击球手感，打球重在体验击球质感",
        coreTraits: "细腻感性、看重持球手感、不喜暴力发力，享受每一次触球反馈",
        playStyle: "细腻台内控制流，轻搓轻挑讲究持球手感，依靠细微旋转变化拿分",
        signatureMove: "精细摆短、轻柔加转搓球、台内挑打微调旋转",
        strengths: "台内小球处理极致细腻，旋转控制入微，业余对手很难上手抢攻",
        weaknesses: "中远台乏力，不会主动退台相持，对手强行拉长球就被动挨打",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、画像解读</h3>
            <p class="text-gray-600 mb-6">你极度迷恋胶皮触球的持球手感，每一次搓球、摆短都刻意微调触球厚薄，台内小球控制力拉满，对手很难抢先起板进攻。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">专属优势</h4>
                <p class="text-gray-700">台内博弈几乎不吃亏，低分段对手根本无法突破你的台内控制。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、核心短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>惧怕长球相持</strong>，对手连续劈长底线只能被动防守</li>
                <li><strong>主动发力进攻意愿低</strong>，永远依赖台内小球周旋</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、补强计划</h3>
            <ul class="list-disc pl-6 text-gray-600">
                <li>练习反手拧拉接长球起板，不再被底线长球压制</li>
                <li>保留台内优势，配套一套退台反拉技术作为后手</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破</h3>
            <p class="text-gray-600">补上长球相持短板，你的台内优势就能完整发挥，段位上涨${score+105}分。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ESTP": {
        type: "临场突击莽攻手",
        tagline: "主打临场爆发，抓住机会就全力一板终结",
        coreTraits: "反应迅猛、敢打敢拼、临场爆发力极强，喜欢抓住瞬间机会强攻",
        playStyle: "机会主义强攻流，不拉扯多拍，出现半高球立刻全力爆冲终结",
        signatureMove: "半高球暴力扣杀、侧身突袭、长球起板全速进攻",
        strengths: "上手速度极快，抓住机会一击制胜，高压关键分敢于发力不手软",
        weaknesses: "耐心极差，不愿多拍周旋，强行发力失误率居高不下，台内小球粗糙",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、特点总结</h3>
            <p class="text-gray-600 mb-6">只要对手回球冒半高，你瞬间侧身全力爆冲，一板直接终结回合，关键分敢于搏杀，经常逆风翻盘。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">进攻优势</h4>
                <p class="text-gray-700">搏杀威慑力极强，对手回球时刻意压低弧线不敢冒高，间接降低对手进攻质量。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>台内小球粗糙</strong>，摆短挑打容易冒高送给对手扣杀机会</li>
                <li><strong>无多拍相持耐心</strong>，连续几板打不死就急躁强行发力失误</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、优化方案</h3>
            <ul class="list-disc pl-6 text-gray-600">
                <li>每天10分钟专项练台内摆短，补齐台内短板</li>
                <li>设定规则：至少相持3板再全力搏杀，减少无谓失误</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、涨分预判</h3>
            <p class="text-gray-600">保留强攻杀手锏，补齐台内控制短板，稳定涨分${score+135}分。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    },
    "ESFP": {
        type: "赛场表演型球友",
        tagline: "打球重在观赏性，每回合都打得热闹好看",
        coreTraits: "外向爱表现、享受赛场关注度、不在乎比分输赢，打球主打观赏性",
        playStyle: "花哨表演型打法，愿意尝试花式回球，回合打得热闹观赏性拉满",
        signatureMove: "高调扣杀、大范围跑动救球、花式非常规回球",
        strengths: "跑动积极、观赏性强，球局气氛活跃，不怕高强度对抗",
        weaknesses: "战术规划缺失，回球只追求好看不讲究落点，得分效率偏低",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、画像总结</h3>
            <p class="text-gray-600 mb-6">全场跑动积极，哪怕被动远台救球也会奋力捞回，花式回球层出不穷，围观球友多的时候发挥更加兴奋，打球观赏性拉满。</p>
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">独特优势</h4>
                <p class="text-gray-700">跑动覆盖范围大，很多必死球都能极限救回，对手很难轻松一板打死。</p>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、得分短板</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>回球优先追求好看，忽略落点线路</strong>，救球漂亮但直接送机会</li>
                <li><strong>缺少成套得分战术</strong>，全程被动救球，主动得分手段稀少</li>
            </ol>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、折中提升方案</h3>
            <ul class="list-disc pl-6 text-gray-600">
                <li>娱乐局保留花式打法；竞技对局优先落点线路，观赏性次之</li>
                <li>固定一套发球抢攻主动得分套路，不再全程被动救球</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、定位建议</h3>
            <p class="text-gray-600">不用改掉爱跑动、观赏性强的特点，增加主动得分战术，既能继续活跃气氛，竞技段位也能稳步提升${score+115}分。</p>
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。</p>
        `
    }
};

// ============ 以下代码粘贴到你现有 script.js 文件最末尾，不改动原有任何业务代码 ============
const HUPIJIAO_MCH_ID = "201906181673";
const HUPIJIAO_KEY = "685ed8bb1d5468e8771aaee1109913c4";
const PRICE_FEE = "9.90";
const GOODS_TITLE = "乒乓MBTI完整深度报告解锁";

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// 生成分享二维码
function createQRCode() {
  $("#qrcode-box").innerHTML = "";
  new QRCode($("#qrcode-box"), {
    text: window.location.href,
    width: 120,
    height: 120
  });
}

// 一键保存分享截图
$("#save-share-img").addEventListener("click", async () => {
  try {
    const canvas = await html2canvas($("#share-wrap"), {scale:2});
    const link = document.createElement('a');
    link.download = "乒乓MBTI测试结果.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }catch(e){
    alert("保存失败，可长按页面截图手动保存");
  }
});

// 开始测试按钮跳转页面
$("#btn-start-test").addEventListener("click", () => {
  $("#home-page").classList.add("hidden");
  $("#question-page").classList.remove("hidden");
  // 调用你原有启动测试初始化函数（你原来的startTest()）
  startTest();
});

// 关闭结果弹窗
$("#close-result").addEventListener("click", () => {
  $("#result-modal").classList.add("hidden");
});

// 重新测试，返回首页
$("#restart-test").addEventListener("click", () => {
  $("#result-modal").classList.add("hidden");
  $("#question-page").classList.add("hidden");
  $("#home-page").classList.remove("hidden");
  // 调用你原有重置答题进度的函数
  resetTest();
});

// 虎皮椒支付跳转逻辑
$("#pay-btn-unlock").addEventListener("click", async function(){
  const orderNo = "PINGPONG_" + Date.now();
  const params = new URLSearchParams();
  params.append("mchid", HUPIJIAO_MCH_ID);
  params.append("out_trade_no", orderNo);
  params.append("total_fee", PRICE_FEE);
  params.append("body", GOODS_TITLE);
  params.append("notify_url", window.location.origin + "/pay-notify");

  const signStr = `mchid=${HUPIJIAO_MCH_ID}&out_trade_no=${orderNo}&total_fee=${PRICE_FEE}&key=${HUPIJIAO_KEY}`;
  async function md5(str){
    const buf = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest("MD5", buf);
    return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  const sign = await md5(signStr);
  params.append("sign", sign);
  params.append("sign_type", "MD5");

  window.location.href = `https://pay.hupijiao.com/pay/create?${params.toString()}`;
});

// 支付成功解锁完整报告
function paySuccessCallback() {
  $("#pay-overlay").classList.add("hidden");
  $("#full-long-report").classList.remove("hidden");
  $("#pay-success-modal").classList.remove("hidden");
}
$("#close-pay-success").addEventListener("click", () => {
  $("#pay-success-modal").classList.add("hidden");
});

/**
 * 对外暴露渲染结果统一接口
 * 你原有答题计算出人格后，调用：
 * showResultModal(简短免费介绍文本, 1000字完整付费报告文本)
 */
function showResultModal(briefText, fullReportText){
  $("#free-brief-desc").innerHTML = briefText;
  $("#full-long-report").innerText = fullReportText;
  $("#pay-overlay").classList.remove("hidden");
  $("#full-long-report").classList.add("hidden");
  $("#result-modal").classList.remove("hidden");
  createQRCode();
}    