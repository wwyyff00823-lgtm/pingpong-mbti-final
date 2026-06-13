// ====================== 唯一需要修改的3个配置 ======================
const BILIBILI_URL = "https://space.bilibili.com/你的匿名B站小号ID";
const HUPIJIAO_MCH_ID = "你的虎皮椒商户ID";
const HUPIJIAO_KEY = "你的虎皮椒商户密钥";

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
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>基本功太差</strong>。别再整天琢磨那些花里胡哨的技术了，先把基本功练扎实。只要基本功扎实了，你的天赋才能发挥出来，3个月上${score+150}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "INFJ": {
        type: "六边形战士",
        tagline: "没有明显短板，什么都能打两下",
        coreTraits: "均衡、全面、无死角，球馆里最让人头疼的"均衡怪"",
        playStyle: "全面型选手，攻防均衡，没有明显的技术漏洞",
        signatureMove: "无招胜有招+滴水不漏的防守",
        strengths: "技术全面，没有明显短板，心理素质好，发挥稳定",
        weaknesses: "没有突出的特长，关键时刻缺乏一锤定音的能力",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"六边形战士"！你的技术非常全面，攻防均衡，没有明显的漏洞。跟你打球非常累，因为你什么都能打，什么球都能接回去，想赢你真的太难了。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"没有特长"是缺点，但其实正是因为你全面，才让你成为了球馆里最难打的对手。那些有特长的人，往往也有明显的短板，而你没有，对手根本找不到你的弱点。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>没有突出的特长</strong>：你什么都能打，但什么都不精。遇到防守好的对手，你打不死他；遇到进攻好的对手，你防不住他。</li>
                <li><strong>关键时刻缺乏一锤定音的能力</strong>：9:9的时候，你总是没有办法一板打死对手，只能跟他磨，结果往往是你先失误。</li>
                <li><strong>打法不够凶狠</strong>：你打球太"温柔"了，总是给对手留有余地，缺乏杀气。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：打造自己的杀手锏</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>选择一个你最擅长的技术，比如正手爆冲或者反手拧拉</li>
                <li>把这个技术练到极致，成为你的杀手锏</li>
                <li>在比赛中刻意运用这个技术，争取一板解决问题</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：提高关键球能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>每次打球专门练10:10以后的球</li>
                <li>关键分的时候，敢于出手，打对手最难受的点</li>
                <li>培养自己的杀气，该下手的时候就要下手</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：加强进攻的凶狠度</strong>：在比赛中，增加进攻的比例，有机会就进攻，不要总是打控制球。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：控制为主，伺机进攻</strong>：先通过控制球调动对手，等他出现失误后再进攻。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：多拍相持</strong>：利用你全面的技术，和对手打多拍相持，等待他失误。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：关键球拼杀</strong>：在关键分的时候，敢于拼杀，不要犹豫。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手狂飙3 39度+反手729焦点3，全面均衡。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶科贝尔底板+正手省狂3 39度+反手蝴蝶罗泽娜，经典全面配置。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶维斯卡利亚底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，业余球友的万能板。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>没有突出的特长</strong>。只要你能打造出一个属于自己的杀手锏，让对手防不住你，你的球技会有质的飞跃，3个月上${score+170}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "INFP": {
        type: "球场艺术家",
        tagline: "他打的不是球，是艺术",
        coreTraits: "细腻、优雅、有情怀，打球不为输赢，只为享受过程",
        playStyle: "优雅型选手，动作舒展，球路优美，观赏性极高",
        signatureMove: "随心所欲的艺术球+流畅的衔接",
        strengths: "手感细腻，球路优美，心态好，从不跟人争执",
        weaknesses: "没有进攻欲望，关键球手软，赢球欲望不强",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你是球馆里最纯粹的人！你打球不是为了赢，而是因为你真的热爱乒乓球这项运动。你的球路非常优美，动作舒展，看你打球简直是一种享受。跟你打球也非常舒服，你从不跟人争执，输了也一笑而过。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"赢球欲望不强"是缺点，但其实正是因为你心态好，才让你发挥得非常稳定。那些太想赢的人，往往会因为压力大而发挥失常，而你不会，你总是能打出自己的水平。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>没有进攻欲望</strong>：你总是喜欢打控制球，有机会也不进攻，总是给对手留有余地。</li>
                <li><strong>关键球手软</strong>：9:9的时候，明明有机会一板打死，你却轻轻一拉，结果被对手反杀。</li>
                <li><strong>缺乏杀气</strong>：打球太温柔了，一点霸气都没有，对手根本不怕你。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：培养进攻意识</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>在训练中，只要有机会就进攻，不要犹豫</li>
                <li>练半高球杀球，一定要发力打死，不要留情</li>
                <li>告诉自己：进攻是最好的防守</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：关键球训练</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>每次打球专门练10:10以后的球</li>
                <li>关键球的时候一定要果断出手，不要想太多</li>
                <li>告诉自己：这一分我必须拿下</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：培养杀气</strong>：在比赛中，要展现出你的霸气，让对手知道你不好惹。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：控制为主，伺机进攻</strong>：先通过控制球调动对手，等他出现失误后再进攻。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：旋转变化</strong>：利用旋转变化，让对手难以适应。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：落点控制</strong>：通过精准的落点控制，调动对手，创造进攻机会。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手729-08+反手729焦点3，手感好。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶科贝尔底板+正手狂飙3 39度+反手蝴蝶罗泽娜，全面均衡。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶刘诗雯ZLF底板+正手蓝海绵狂飙3 38度+反手蝴蝶T05FX，手感细腻。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>没有赢球的欲望</strong>。如果你只是想娱乐健身，那现在这样就挺好的。但如果你想提高球技，就必须改变心态，要有赢球的欲望。只要你有了赢球的欲望，你的球技自然会提高，3个月上${score+140}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ENFJ": {
        type: "气场压制王",
        tagline: "光站在那里，就给对手无形压力",
        coreTraits: "热情、有感染力、气场强，天生的领导者",
        playStyle: "激情型选手，越到关键时刻越能超水平发挥",
        signatureMove: "气势压制+关键球大心脏",
        strengths: "比赛气质极佳，关键球能力强，能带动队友的情绪",
        weaknesses: "技术不够细腻，容易情绪化，状态起伏大",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球场上的"气场压制王"！只要有你在，整个球馆的气氛都不一样了。你打球非常有激情，能感染身边的每一个人。越到关键时刻，你越能超水平发挥，经常能上演逆转好戏。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"技术不够细腻"是缺点，但其实正是因为你的气场强大，才让你赢了很多本来赢不了的比赛。很多对手还没跟你打，就已经在气势上输给你了。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>技术不够细腻</strong>：你的技术比较粗糙，台内小球处理得不好，容易被对手抢攻。</li>
                <li><strong>容易情绪化</strong>：一旦遇到不顺心的情况，就容易急躁失误。</li>
                <li><strong>状态起伏大</strong>：状态好的时候谁都能赢，状态差的时候谁都能输。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：技术精细化训练</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练台内小球，包括摆短、挑打、拧拉</li>
                <li>打磨基础技术，纠正错误动作</li>
                <li>提高技术的稳定性和精细度</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：情绪控制训练</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>在比赛中，不管遇到什么情况，都要保持冷静</li>
                <li>丢分了不要抱怨，不要摔拍子，马上准备下一分</li>
                <li>学会用深呼吸调整自己的情绪</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：稳定性训练</strong>：多打比赛，积累比赛经验，提高状态的稳定性。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：气势压制</strong>：通过大声呐喊、庆祝等方式，在气势上压倒对手。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：关键球战术</strong>：在关键分的时候，打对手最难受的点，敢于出手。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：双打配合</strong>：在双打比赛中，多和队友沟通，调动队友的积极性。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手狂飙3 39度+反手729焦点3，性价比高。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡CLCR底板+正手省狂3 39度+反手蝴蝶罗泽娜，适合激情型打法。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶张继科ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，进攻给力。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>技术不够细腻</strong>。只要你能把技术细节打磨好，减少不必要的失误，你的胜率会大大提高，3个月上${score+170}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ENFP": {
        type: "中远台跑男",
        tagline: "只要球不落地，他就能跑过去",
        coreTraits: "活力四射、体能充沛、永不放弃，满场飞奔救球",
        playStyle: "跑动型选手，中远台能力强，救球能力逆天",
        signatureMove: "极限救球+中远台反拉",
        strengths: "体能好，跑动积极，中远台能力强，永不放弃",
        weaknesses: "近台能力差，进攻质量不高，容易被对手打追身",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"跑不死"！你的体能简直是怪物级别的，满场飞奔，什么球都能救回来。跟你打球，对手会被你跑死，很多看似已经死了的球，你都能神奇地救回来，太让人绝望了。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"只会跑"是缺点，但其实正是因为你能跑，才让你有了更多的容错空间。很多对手跟你打，打着打着就没信心了，因为他们发现怎么打都打不死你。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>近台能力差</strong>：你总是习惯性退台，近台的小球处理得不好，容易被对手在近台打死。</li>
                <li><strong>进攻质量不高</strong>：你的进攻更多是靠数量取胜，而不是质量，很难一板打死对手。</li>
                <li><strong>容易被打追身</strong>：你总是在跑动中，对手一打追身球，你就很难处理。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：提高近台能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练习近台快攻，不要总是退台</li>
                <li>练台内挑打和拧拉，提高近台进攻能力</li>
                <li>学会在近台解决问题，不要什么球都退台</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：提高进攻质量</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练习正手爆冲和反手撕，提高进攻的威胁</li>
                <li>体会用腰腹发力的感觉，不要只用胳膊发力</li>
                <li>争取每一板进攻都有质量，能一板打死就不要打第二板</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：防追身球训练</strong>：专门练习防追身球，学会用身体让位，不要总是用手够球。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：退台防守反击</strong>：先退台防守，等对手进攻质量下降后再反击。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：多拍相持</strong>：利用你的体能优势，和对手打多拍相持，把他跑垮。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：落点调动</strong>：通过精准的落点控制，调动对手跑起来，让他疲于奔命。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河MC-2底板+正手狂飙3 39度+反手729焦点3，弧圈球好。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡OC底板+正手省狂3 39度+反手蝴蝶罗泽娜，中远台好。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶波尔ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，全面均衡。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>近台能力差和进攻质量不高</strong>。只要你能提高近台能力和进攻质量，你的球技会有质的飞跃，3个月上${score+160}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ISTJ": {
        type: "防守铁长城",
        tagline: "想得分？先打穿他的铜墙铁壁",
        coreTraits: "踏实、严谨、有耐心，打球稳如老狗",
        playStyle: "稳健防守型，失误极少，靠对手失误得分",
        signatureMove: "铜墙铁壁防守+磨死人不偿命",
        strengths: "防守稳固，失误极少，耐心十足，能磨垮任何对手",
        weaknesses: "进攻能力基本为零，得分手段单一，只会被动挨打",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里最让人头疼的对手！你的防守简直是铜墙铁壁，对手怎么打都打不死。跟你打球，能把人累死，很多人打着打着就自己失误了。你这种打法，在业余球馆里真的很吃香。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"只会防守"是缺点，但其实在业余球馆里，防守好的人胜率最高。因为业余球友的失误率都很高，你只要能把球接回去，对手大概率会自己失误。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>进攻能力为零</strong>：你只会搓球和挡球，根本不会进攻，有半高球都不敢打。</li>
                <li><strong>得分手段单一</strong>：你所有的得分都靠对手失误，自己根本创造不了得分机会。</li>
                <li><strong>缺乏主动性</strong>：你总是被动挨打，从来不会主动进攻，控制不了比赛节奏。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：学会正手攻球</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>从最基础的正手攻球开始练，每次练30分钟</li>
                <li>不要发力，先保证上台，体会击球的感觉</li>
                <li>能连续打20个不失误就算成功</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：练发球抢攻</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练一个简单的发球，比如下旋发球</li>
                <li>对手搓回来之后，你就正手攻一板</li>
                <li>形成固定的发球抢攻套路</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：提高进攻质量</strong>：在保证上台的前提下，逐渐增加进攻的力量和旋转。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：防守反击</strong>：先防守，等对手出现失误后再反击。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：搓球控制</strong>：通过搓球控制对手，让他进攻失误。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：多拍相持</strong>：利用你的耐心优势，和对手打多拍相持，等待他失误。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手狂飙3 38度+反手729天翼，防守好。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶科贝尔底板+正手狂飙3 39度+反手蝴蝶罗泽娜，全面均衡。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶Innerforce ALC底板+正手蓝海绵狂飙3 38度+反手蝴蝶T05FX，防守稳健。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>只会防守不会进攻</strong>。记住一句话：最好的防守就是进攻。只要你学会了进攻，能自己创造得分机会，你的球技会有质的飞跃，3个月上${score+150}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ISFJ": {
        type: "双打万金油",
        tagline: "和谁搭档都能赢，双打必备神器",
        coreTraits: "细心、体贴、有责任感，默默做好自己的事",
        playStyle: "团队型选手，双打能力远超单打",
        signatureMove: "完美接发球控制+无缝搭档补位",
        strengths: "双打配合默契，心态好，善于照顾队友",
        weaknesses: "单打能力弱，缺乏攻击性，过于在意他人感受",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你是球馆里最靠谱的队友！你平时很低调，不张扬，但打球非常稳，关键时刻从不掉链子。在双打比赛中，你总是默默做好自己的事，为队友补位，是最值得信赖的搭档。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"单打能力弱"是缺点，但其实在业余球馆里，双打比单打更受欢迎。很多人都抢着跟你打双打，因为跟你搭档赢球的概率太高了。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>单打能力弱</strong>：你习惯了和队友配合，单打时不知道该怎么打，缺乏独立得分的能力。</li>
                <li><strong>缺乏攻击性</strong>：你总是喜欢打控制球，很少主动进攻，威胁不大。</li>
                <li><strong>过于在意他人感受</strong>：在比赛中，有时候会因为顾及队友的感受而不敢出手，错失良机。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：提高单打能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>多打单打比赛，提高单打能力</li>
                <li>练习独立得分的能力，不要总是依赖队友</li>
                <li>提高进攻的主动性和攻击性</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：增强攻击性</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>在训练中，刻意增加进攻的比例</li>
                <li>有机会就进攻，不要总是打控制球</li>
                <li>提高进攻的质量和威胁</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：专注于自己的发挥</strong>：在比赛中，专注于自己的发挥，不要过于在意他人的感受。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：接发球控制</strong>：通过精准的接发球控制，为队友创造进攻机会。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：搭档补位</strong>：在双打比赛中，及时为队友补位，弥补队友的漏洞。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：团队激励</strong>：在比赛中，多鼓励队友，调动队友的积极性。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河MC-2底板+正手狂飙3 39度+反手729焦点3，弧圈球好。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡OC底板+正手省狂3 39度+反手蝴蝶罗泽娜，中远台好。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶波尔ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，全面均衡。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>单打能力弱和进攻主动性不足</strong>。只要你能提高单打能力和进攻的主动性，你的球技会有很大的提高，3个月上${score+160}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ESTJ": {
        type: "一板过杀神",
        tagline: "他的球，你能接住一次就算赢",
        coreTraits: "果断、干脆、有杀气，打球绝不拖泥带水",
        playStyle: "暴力快攻型，一板解决问题，绝不打第二板",
        signatureMove: "正手爆冲+一板过",
        strengths: "进攻极其暴力，一板过能力强，发球好",
        weaknesses: "相持能力差，防守差，失误多",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"一板过杀神"！你的进攻太暴力了，只要让你上手，基本就是一板打死，对手连反应的时间都没有。跟你打球，对手的神经必须时刻紧绷，稍微放松一点就会被你一板冲死。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"失误多"是缺点，但其实正是因为你敢一板过，才让对手对你产生了恐惧心理。很多对手跟你打，还没打就已经怂了，接发球的时候手都在抖。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>相持能力差</strong>：你只会打一板过，一旦对手防住了你的第一板，你就不知道该怎么打了。</li>
                <li><strong>防守差</strong>：你只会进攻，不会防守，对手只要进攻，你基本就防不住。</li>
                <li><strong>失误多</strong>：你总是追求一板打死，很多球其实不用那么发力，轻轻一拉就有了。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：提高相持能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练习多拍相持，每次至少连续打10板</li>
                <li>不要总想着一板打死，先保证上台</li>
                <li>学会打连续进攻，不要打一板就站死在那里</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：学会防守</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练习反手挡球和正手防弧圈</li>
                <li>不要总是想着进攻，该防守的时候就要防守</li>
                <li>能防住对手的进攻，你就赢了一半</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：控制失误</strong>：在比赛中，刻意减少进攻的力量，先保证上台，再追求质量。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：发球抢攻</strong>：利用你好的发球，创造抢攻机会，一板打死对手。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：接发球抢攻</strong>：只要对手发球质量不高，你就直接上手抢攻。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：快攻战术</strong>：利用你的速度优势，打快攻，不让对手退台。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河T-2底板+正手狂飙3 40度+反手729焦点3，进攻给力。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡黑檀7底板+正手省狂3 40度+反手蝴蝶T05，暴力进攻。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶樊振东ALC底板+正手蓝海绵狂飙3 40度+反手蝴蝶T05，适合暴力快攻型打法。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>相持能力差和防守差</strong>。只要你能提高相持能力和防守能力，你的胜率会大大提高，3个月上${score+170}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ESFJ": {
        type: "接发控制师",
        tagline: "只要让他接发球，你就别想上手",
        coreTraits: "细心、有耐心、控制能力强，接发球天下第一",
        playStyle: "控制型选手，能把对手的接发控得死死的",
        signatureMove: "精准接发控制+台内小球",
        strengths: "接发球好，台内小球细腻，控制能力强",
        weaknesses: "进攻能力弱，中远台能力差，缺乏杀伤力",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"接发控制师"！你的接发球技术简直是一绝，不管对手发什么球，你都能处理得非常好。只要让你接发球，对手基本就别想上手了，只能被你牵着鼻子走。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"进攻能力弱"是缺点，但其实接发球好的人，在业余球馆里是无敌的。因为业余球友的发球都不怎么样，只要你能接好发球，你就已经赢了一半。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>进攻能力弱</strong>：你只会控制球，不会进攻，有机会也不发力，总是给对手留有余地。</li>
                <li><strong>中远台能力差</strong>：一旦退到中远台，你的回球质量会急剧下降，只能被动挨打。</li>
                <li><strong>缺乏杀伤力</strong>：你的球没有威胁，对手根本不怕你，敢跟你打相持。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：提高进攻能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练习正手攻球和反手攻球，提高进攻的威胁</li>
                <li>有机会就进攻，不要总是打控制球</li>
                <li>学会发力，不要总是轻碰球</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：提高中远台能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练习中远台拉球，体会摩擦球的感觉</li>
                <li>不要总是站在近台，要学会退台防守和反击</li>
                <li>提高中远台的回球质量</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：增加杀伤力</strong>：在比赛中，增加进攻的力量和旋转，让你的球更有威胁。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：接发球抢攻</strong>：利用你好的接发球技术，直接上手抢攻。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：台内小球控制</strong>：通过台内小球控制，调动对手，创造进攻机会。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：搓球转正手进攻</strong>：先搓球控制对手，等他回搓后，你就正手进攻。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手狂飙3 39度+反手729天翼，控制好。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶科贝尔底板+正手狂飙3 39度+反手蝴蝶罗泽娜，全面均衡。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶Innerforce ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05FX，控制极佳。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>进攻能力弱和缺乏杀伤力</strong>。只要你能提高进攻能力和杀伤力，你的球技会有质的飞跃，3个月上${score+160}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ISTP": {
        type: "技术教科书",
        tagline: "他的动作，教练看了都要夸一句标准",
        coreTraits: "冷静、务实、动手能力强，追求技术完美",
        playStyle: "技术流选手，动作标准得像机器人，挑不出毛病",
        signatureMove: "教科书式动作+精准落点",
        strengths: "技术动作标准，基本功扎实，细节处理到位",
        weaknesses: "战术意识差，比赛能力弱，缺乏大局观",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"技术教科书"！你的技术动作太标准了，每一个动作都像从教科书里走出来的一样，教练看了都要夸你。你的基本功非常扎实，几乎没有技术漏洞。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"战术意识差"是缺点，但其实正是因为你的技术太标准了，才让对手很难找到你的破绽。很多对手跟你打，打着打着就没信心了，因为他们发现怎么打都打不穿你的技术防线。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>战术意识差</strong>：你只注重技术动作，不懂得运用战术，打球没有变化。</li>
                <li><strong>比赛能力弱</strong>：你练球的时候打得很好，但一到比赛就发挥不出来。</li>
                <li><strong>缺乏大局观</strong>：你只关注眼前的这一个球，不懂得规划整个比赛的战术。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：培养战术意识</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>学习基本的战术知识，了解不同战术的运用时机</li>
                <li>在训练中，刻意运用不同的战术</li>
                <li>增加球路的变化，不要总是按照固定的套路打球</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：提高比赛能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>多打比赛，积累比赛经验</li>
                <li>学会在比赛中调整自己的状态</li>
                <li>不要因为一个球的失误而影响整个比赛</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：培养大局观</strong>：学会从全局的角度思考问题，不要只关注眼前的这一个球。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：技术压制</strong>：利用你扎实的基本功，在技术上压制对手。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：精准落点</strong>：通过精准的落点控制，调动对手，创造进攻机会。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：多拍相持</strong>：利用你扎实的基本功，和对手打多拍相持，等待他失误。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手狂飙3 39度+反手729焦点3，全面均衡。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶科贝尔底板+正手省狂3 39度+反手蝴蝶罗泽娜，经典全面配置。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶波尔ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，全面均衡。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>战术意识差和比赛能力弱</strong>。只要你能提高战术意识和比赛能力，你的球技会有质的飞跃，3个月上${score+180}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ISFP": {
        type: "优雅节奏师",
        tagline: "他能把你打得浑身难受，还不发力",
        coreTraits: "温和、优雅、有节奏感，打球不紧不慢",
        playStyle: "节奏型选手，不跟你拼速度力量，专打你的节奏差",
        signatureMove: "节奏变化+落点控制",
        strengths: "节奏好，手感细腻，落点精准，心态稳定",
        weaknesses: "力量小，进攻没威胁，身体对抗能力差",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"优雅节奏师"！你打球太有节奏感了，不紧不慢，不慌不忙，总能把对手的节奏打乱。跟你打球，对手会浑身难受，有力使不出，明明自己力量比你大，速度比你快，就是赢不了你。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"力量小"是缺点，但其实节奏才是乒乓球的灵魂。很多力量大、速度快的选手，遇到你这种节奏型选手，根本发挥不出自己的优势，只会被你牵着鼻子走。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>进攻没威胁</strong>：你的进攻就像挠痒痒一样，就算打到了对手的空档，也打不死他，反而给了他反击的机会。</li>
                <li><strong>中远台能力差</strong>：一旦退到中远台，你的回球质量会急剧下降，只能被动挨打。</li>
                <li><strong>身体对抗能力弱</strong>：遇到那种猛冲猛打的对手，你根本扛不住，两下就被冲垮了。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：增加进攻力量</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>每天做20个俯卧撑，练手臂力量</li>
                <li>练习正手爆冲，体会用腰腹发力的感觉</li>
                <li>不要只用胳膊发力，要用整个身体的力量</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：提高中远台能力</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>退到中远台练拉球，体会摩擦球的感觉</li>
                <li>练习中远台相持，提高中远台的回球质量</li>
                <li>不要总是站在近台，要学会退台防守和反击</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：身体训练</strong>：每周跑两次步，增强体能和身体对抗能力。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：节奏变化</strong>：一板快一板慢，一板转一板不转，打乱对手的节奏。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：落点控制</strong>：把球打到对手最难受的地方，让他跑起来，不要让他站着打。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：控制为主，伺机进攻</strong>：先通过控制球调动对手，等他出现失误后再进攻。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河MC-2底板+正手狂飙3 39度+反手729焦点3，弧圈球好。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：斯蒂卡玫瑰5底板+正手省狂3 39度+反手蝴蝶T64，旋转强。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶Innerforce ALC底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，适合控制型打法。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>进攻没威胁</strong>。只要你能把进攻的力量提上来，让对手不敢随便进攻你，你的胜率会大大提高，3个月上${score+160}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ESTP": {
        type: "即兴表演家",
        tagline: "手感来了谁都挡不住，爱打神仙球",
        coreTraits: "活泼、好动、反应快，善于即兴发挥",
        playStyle: "灵动型选手，手感极佳，擅长打神仙球",
        signatureMove: "台内小球+突然变线",
        strengths: "手感好，反应快，即兴发挥能力强",
        weaknesses: "稳定性差，基本功薄弱，缺乏耐心",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"即兴表演家"！你的反应能力和手感简直是逆天，总能在看似没有机会的情况下打出让人惊叹的神仙球。看你打球真的太享受了，你永远不知道下一个球会怎么打。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"稳定性差"是缺点，但其实正是因为你不按常理出牌，才让对手很难预判你的球路。很多对手跟你打，根本不知道你下一个球会打向哪里，只能被动挨打。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、你最致命的3个毛病</h3>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>稳定性太差</strong>：你的技术动作时好时坏，今天能打出神球，明天能打出臭球。</li>
                <li><strong>基本功薄弱</strong>：你的基础技术不够扎实，有明显的技术漏洞。</li>
                <li><strong>缺乏耐心</strong>：你打不了多拍相持，一旦超过3板就容易急躁失误。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3个月训练计划</h3>
            <p class="text-gray-600 mb-4"><strong>第1个月：稳定性训练</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>练基础技术，提高技术动作的稳定性</li>
                <li>每次打球都要给自己定一个失误指标，比如一局最多失误5个</li>
                <li>不要总想着打神球，先把该打上的球打上</li>
            </ul>
            <p class="text-gray-600 mb-4"><strong>第2个月：失误控制训练</strong></p>
            <ul class="text-gray-600 mb-4 space-y-1 list-disc pl-6">
                <li>在比赛中，刻意减少进攻的比例，多打相持</li>
                <li>没有绝对机会的时候不要发力，先保证上台</li>
                <li>学会控制自己的情绪，不要头脑发热</li>
            </ul>
            <p class="text-gray-600 mb-6"><strong>第3个月：实战应用</strong>：在比赛中，学会合理分配体力和精力，不要一上来就猛冲猛打。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、3套拿来就能用的套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：台内小球</strong>：利用你细腻的手感，在台内小球上占据优势。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：突然变线</strong>：在相持中突然变线到对手的空档，打他一个措手不及。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：即兴发挥</strong>：利用你出色的即兴发挥能力，打出一些让对手意想不到的球。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、器材推荐</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河N-10底板+正手729-2+反手729天翼，便宜耐用。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶孔令辉纯木底板+正手狂飙3 39度+反手蝴蝶罗泽娜，手感好。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶水谷隼ZLC底板+正手蝴蝶T05+反手蝴蝶T64，适合变化多的打法。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">六、瓶颈突破指南</h3>
            <p class="text-gray-600 mb-6">你现在卡在${score}分上不去，核心原因就是<strong>稳定性太差</strong>。只要你能提高稳定性，减少不必要的失误，你的球技会有质的飞跃，3个月上${score+150}分不是问题。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，可能是因为你在某些问题的回答上存在不一致，建议你根据自己的实际打球情况参考报告。</p>
        `
    },
    "ESFP": {
        type: "快乐乒乓人",
        tagline: "输赢无所谓，开心最重要",
        coreTraits: "乐观、开朗、爱热闹，享受打球的过程",
        playStyle: "娱乐型选手，输赢不重要，开心最重要",
        signatureMove: "花式打球+快乐乒乓",
        strengths: "心态好，享受比赛，能给大家带来快乐",
        weaknesses: "缺乏进取心，训练不认真，技术提升慢",
        fullReport: (score, accuracy) => `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">一、先跟你掏句心窝子</h3>
            <p class="text-gray-600 mb-6">兄弟，你就是球馆里的"快乐源泉"！跟你打球永远不会有压力，因为你从来不会因为输球而生气。你打球不是为了赢，只是为了开心，为了出一身汗，为了和朋友们聚聚。</p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">💡 反直觉结论</h4>
                <p class="text-gray-700">你总觉得自己"技术提升慢"是缺点，但其实你才是真正懂得乒乓球真谛的人。乒乓球本来就是一项娱乐运动，开心才是最重要的。很多人为了赢球搞得自己很痛苦，反而失去了打球的乐趣。</p>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">二、如果你想提高球技</h3>
            <p class="text-gray-600 mb-6">如果你只是想娱乐健身，那现在这样就挺好的，不用改变什么。但如果你想提高球技，可以试试以下方法：</p>
            <ol class="text-gray-600 mb-6 space-y-2 list-decimal pl-6">
                <li><strong>树立一个小目标</strong>：比如3个月内提高50分，有目标才有动力。</li>
                <li><strong>认真训练</strong>：在训练中集中注意力，认真练习每一个技术动作。</li>
                <li><strong>多打比赛</strong>：比赛是检验训练成果的最好方式，要认真对待每一场比赛。</li>
            </ol>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">三、3套快乐乒乓套路</h3>
            <p class="text-gray-600 mb-4"><strong>套路1：快乐乒乓</strong>：享受比赛过程，不要过于在意输赢。</p>
            <p class="text-gray-600 mb-4"><strong>套路2：花式打球</strong>：在不影响比赛的情况下，尝试一些花式打法，增加比赛的趣味性。</p>
            <p class="text-gray-600 mb-6"><strong>套路3：气氛带动</strong>：在比赛中带动气氛，让大家都能享受比赛的乐趣。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">四、最适合你的器材</h3>
            <p class="text-gray-600 mb-4"><strong>500元以内</strong>：银河U2底板+正手729-2+反手729天翼，便宜耐用。</p>
            <p class="text-gray-600 mb-4"><strong>1000-1500元</strong>：蝴蝶科贝尔底板+正手狂飙3 39度+反手蝴蝶罗泽娜，全面均衡。</p>
            <p class="text-gray-600 mb-6"><strong>2000元以上</strong>：蝴蝶维斯卡利亚底板+正手蓝海绵狂飙3 39度+反手蝴蝶T05，业余球友的万能板。</p>
            
            <h3 class="text-2xl font-bold mb-4 text-gray-800">五、写在最后</h3>
            <p class="text-gray-600 mb-6">其实乒乓球的本质就是快乐。不管你技术好不好，不管你赢不赢球，只要你能从打球中获得快乐，那就足够了。希望你能一直保持这份对乒乓球的热爱，一直快乐地打下去。</p>
            
            <p class="text-sm text-gray-500 mt-8">本次测试准确度：${accuracy}%。如果与你的实际情况不符，那也没关系，开心最重要！</p>
        `
    }
};

// 全局变量
let currentQuestion = 0;
let userAnswers = [];
let userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let adjustedWeights = {}; // 存储调整后的权重
let userKqScore = 0;
let orderId = "";

// DOM元素
const homePage = document.getElementById("home");
const quizPage = document.getElementById("quiz");
const freeResultPage = document.getElementById("free-result");
const paymentPage = document.getElementById("payment");
const fullReportPage = document.getElementById("full-report");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitScoreBtn = document.getElementById("submit-score-btn");
const payBtn = document.getElementById("pay-btn");
const backToResultBtn = document.getElementById("back-to-result-btn");
const wechatPayBtn = document.getElementById("wechat-pay-btn");

const moduleNameEl = document.getElementById("module-name");
const progressPercentEl = document.getElementById("progress-percent");
const progressBarEl = document.getElementById("progress-bar");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");

// 初始化
function init() {
    startBtn.addEventListener("click", startQuiz);
    prevBtn.addEventListener("click", prevQuestion);
    nextBtn.addEventListener("click", nextQuestion);
    submitScoreBtn.addEventListener("click", submitScore);
    payBtn.addEventListener("click", goToPayment);
    backToResultBtn.addEventListener("click", goBackToResult);
    wechatPayBtn.addEventListener("click", launchWechatPay);

    // 检查是否是支付成功回调
    const urlParams = new URLSearchParams(window.location.search);
    const reportOrderId = urlParams.get("order");
    if (reportOrderId) {
        checkPaymentStatus(reportOrderId);
    }
}

// 开始测试
function startQuiz() {
    homePage.classList.add("hidden");
    quizPage.classList.remove("hidden");
    renderQuestion();
}

// 渲染题目
function renderQuestion() {
    const question = questions[currentQuestion];
    moduleNameEl.textContent = question.module;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressPercentEl.textContent = `${Math.round(progress)}%`;
    progressBarEl.style.width = `${progress}%`;
    questionTextEl.textContent = question.text;
    
    optionsContainerEl.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.className = `p-4 border rounded-lg cursor-pointer transition hover:bg-orange-50 ${userAnswers[currentQuestion] === index ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`;
        optionEl.textContent = option.text;
        optionEl.addEventListener("click", () => selectOption(index));
        optionsContainerEl.appendChild(optionEl);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = userAnswers[currentQuestion] === undefined;
}

// 选择选项
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    renderQuestion();
}

// 上一题
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// 下一题
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        // 所有题目答完，跳转到开球网分数输入
        quizPage.classList.add("hidden");
        document.getElementById("score-input").classList.remove("hidden");
    }
}

// 提交开球网分数
function submitScore() {
    const scoreInput = document.getElementById("kqscore");
    userKqScore = parseInt(scoreInput.value);
    
    if (isNaN(userKqScore) || userKqScore < 1000 || userKqScore > 2800) {
        alert("请输入有效的开球网分数（1000-2800）");
        return;
    }

    // 计算得分和交叉验证
    calculateScores();
    const accuracy = calculateAccuracy();
    const personalityType = getPersonalityType();
    
    // 显示免费结果
    showFreeResult(personalityType, accuracy);
}

// 计算得分
function calculateScores() {
    // 初始化得分
    userScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    adjustedWeights = {};

    // 先计算原始得分
    questions.forEach((question, qIndex) => {
        const answerIndex = userAnswers[qIndex];
        const option = question.options[answerIndex];
        const weight = question.type === "core" ? 3 : 1;
        
        // 累加原始得分
        Object.keys(option.scores).forEach(dimension => {
            userScores[dimension] += option.scores[dimension] * weight;
        });
    });

    // 交叉验证和权重调整
    // 检测矛盾：进攻意愿 vs 实际进攻行为
    const attackWill = userAnswers[20]; // "你喜欢主动进攻吗？"
    const attackAction = userAnswers[3]; // "遇到机会球你会？"
    if ((attackWill === 0 && attackAction > 1) || (attackWill === 3 && attackAction < 2)) {
        // 存在矛盾，降低这两个维度的权重
        adjustedWeights["E"] = 0.5;
        adjustedWeights["T"] = 0.5;
    }

    // 检测矛盾：防守意愿 vs 实际防守行为
    const defenseWill = userAnswers[21]; // "你会主动防守吗？"
    const defenseAction = userAnswers[7]; // "连续拉了3板对手都防回来了，你会？"
    if ((defenseWill === 0 && defenseAction > 1) || (defenseWill === 3 && defenseAction < 2)) {
        adjustedWeights["I"] = 0.5;
        adjustedWeights["S"] = 0.5;
    }

    // 应用调整后的权重
    Object.keys(adjustedWeights).forEach(dimension => {
        userScores[dimension] *= adjustedWeights[dimension];
    });
}

// 计算测试准确度
function calculateAccuracy() {
    let baseAccuracy = 95;
    // 每有一个矛盾点，降低5%的准确度
    const contradictionCount = Object.keys(adjustedWeights).length / 2;
    baseAccuracy -= contradictionCount * 5;
    // 最低准确度70%
    return Math.max(baseAccuracy, 70);
}

// 获取人格类型
function getPersonalityType() {
    let type = "";
    type += userScores.E > userScores.I ? "E" : "I";
    type += userScores.S > userScores.N ? "S" : "N";
    type += userScores.T > userScores.F ? "T" : "F";
    type += userScores.J > userScores.P ? "J" : "P";
    return type;
}

// 显示免费结果
function showFreeResult(personalityType, accuracy) {
    const personality = personalities[personalityType];
    
    document.getElementById("personality-avatar").textContent = PERSONALITY_AVATARS[personalityType] || "🏓";
    document.getElementById("personality-type").textContent = personality.type;
    document.getElementById("personality-tagline").textContent = personality.tagline;
    document.getElementById("accuracy-text").textContent = `本次测试准确度：${accuracy}%`;
    document.getElementById("core-traits").textContent = personality.coreTraits;
    document.getElementById("play-style").textContent = personality.playStyle;
    document.getElementById("signature-move").textContent = personality.signatureMove;
    document.getElementById("strengths").textContent = personality.strengths;
    document.getElementById("weaknesses").textContent = personality.weaknesses;

    document.getElementById("score-input").classList.add("hidden");
    freeResultPage.classList.remove("hidden");
}

// 跳转到支付页面
async function goToPayment() {
    orderId = "PP" + Date.now().toString(36).toUpperCase();
    
    freeResultPage.classList.add("hidden");
    paymentPage.classList.remove("hidden");
    document.getElementById("payment-loading").classList.remove("hidden");
    document.getElementById("payment-ready").classList.add("hidden");

    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId: orderId,
                amount: 990, // 9.9元
                description: '乒乓球人格测试完整报告',
                type: 'MWEB',
                mchId: HUPIJIAO_MCH_ID,
                mchKey: HUPIJIAO_KEY
            })
        });

        const data = await response.json();
        if (data.success) {
            document.getElementById("payment-loading").classList.add("hidden");
            document.getElementById("payment-ready").classList.remove("hidden");
            window.payUrl = data.payUrl;
        } else {
            alert('支付创建失败，请稍后重试');
            goBackToResult();
        }
    } catch (error) {
        alert('网络错误，请稍后重试');
        goBackToResult();
    }
}

// 调起微信支付
function launchWechatPay() {
    if (window.payUrl) {
        window.location.href = window.payUrl;
        // 开始轮询支付状态
        startPaymentPolling(orderId);
    }
}

// 返回免费结果
function goBackToResult() {
    paymentPage.classList.add("hidden");
    freeResultPage.classList.remove("hidden");
}

// 轮询支付状态
function startPaymentPolling(orderId) {
    const pollingInterval = setInterval(async () => {
        try {
            const response = await fetch(`/api/check-payment?orderId=${orderId}`);
            const data = await response.json();
            
            if (data.paid) {
                clearInterval(pollingInterval);
                window.location.href = `/?order=${orderId}`;
            }
        } catch (error) {
            console.error('轮询失败', error);
        }
    }, 2000);
}

// 检查支付状态并显示完整报告
async function checkPaymentStatus(orderId) {
    try {
        const response = await fetch(`/api/check-payment?orderId=${orderId}`);
        const data = await response.json();
        
        if (data.paid) {
            // 重新计算结果（因为刷新后变量会丢失）
            // 注意：生产环境应该从数据库获取用户答案，这里简化处理
            // 实际部署时建议添加localStorage存储用户答案
            const savedAnswers = localStorage.getItem('userAnswers');
            const savedKqScore = localStorage.getItem('userKqScore');
            
            if (savedAnswers && savedKqScore) {
                userAnswers = JSON.parse(savedAnswers);
                userKqScore = parseInt(savedKqScore);
                calculateScores();
                const accuracy = calculateAccuracy();
                const personalityType = getPersonalityType();
                showFullReport(personalityType, accuracy);
            } else {
                alert('测试数据已过期，请重新测试');
                window.location.href = '/';
            }
        } else {
            alert('订单未支付或已过期');
            window.location.href = '/';
        }
    } catch (error) {
        alert('网络错误，请稍后重试');
        window.location.href = '/';
    }
}

// 显示完整报告
function showFullReport(personalityType, accuracy) {
    const personality = personalities[personalityType];
    
    document.getElementById("full-personality-avatar").textContent = PERSONALITY_AVATARS[personalityType] || "🏓";
    document.getElementById("full-personality-type").textContent = personality.type;
    document.getElementById("full-personality-tagline").textContent = personality.tagline;
    document.getElementById("full-accuracy-text").textContent = `本次测试准确度：${accuracy}%`;
    
    const reportContent = document.getElementById("report-content");
    reportContent.innerHTML = personality.fullReport(userKqScore, accuracy);
    
    homePage.classList.add("hidden");
    quizPage.classList.add("hidden");
    document.getElementById("score-input").classList.add("hidden");
    freeResultPage.classList.add("hidden");
    paymentPage.classList.add("hidden");
    fullReportPage.classList.remove("hidden");
}

// 保存用户答案到localStorage
function saveUserAnswers() {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('userKqScore', userKqScore.toString());
}

// 重写nextQuestion和submitScore，添加保存逻辑
const originalNextQuestion = nextQuestion;
nextQuestion = function() {
    saveUserAnswers();
    originalNextQuestion();
};

const originalSubmitScore = submitScore;
submitScore = function() {
    saveUserAnswers();
    originalSubmitScore();
};

// 启动应用
init();