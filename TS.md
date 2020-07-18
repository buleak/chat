1. # 基础类型
   1. 布尔值
      1. > let isShow: boolean = false;
   2. 数字
      1. > let count: number = 0
   3. 字符串
      1. > let text: string = 'xxxxxxx'
   4. 数组
      1. > let arr1: number[] = [1,2,3]
      2. > let arr2: Array<string> = ['z', 'q', 'x']
   5. 元组：已知元素数量和类型
      1. > let tuple: [string, number, number, boolean] = ['x', 1, 2, true]
   6. 枚举：为一组数字赋予名字，默认从 0开始，可以手动赋值
      1. > enum Age {a, b=2, c}
      2. > let x: Age = Age.a // x = 0
   7. any：任何类型
   8. void：没有任何类型[函数无返回值时，其返回类型就是 void]
   9. null：默认情况下null是所有类型的子类型
   10. never：永远不存在值的类型，never是所有类型的子类型
   11. undefined：默认情况下undefined是所有类型的子类型
   12. object：非原始类型，number，string，boolean，symbol，null或undefined之外的类型
2. # 类型断言
   1. xxx as string
   2. <string>xxx
3. # 接口
   1. interface XXX {}
   2. 可选属性：x?: string
   3. 只读属性：readonly x: string
   4. 额外属性：字符串索引签名：[propName: string]: string
   5. 函数类型：(name: string, age: number): boolean
   6. 类类型：
   7. 索引类型：[propName: string | number]: 返回值类型
      1. 可以同时使用字符串索引和数字索引，但数字索引的返回值类型必须时字符串索引返回值类型的子类型。因为使用数字作为索引时，js自动将数字转换成字符串，然后再去索引对象，索引必须被字符串索引返回值类型包含
   8. 接口继承：interface Son extends A, B {}
4. # 类
5. # 函数
6. # 泛型
7. # 枚举
8. # 类型推论
9. # 类型兼容性
10. # 模块
    1.  export x as xx
    2.  export default 
    3.  import x from '...'
    4.  import {x, y as z} from '...'
11. # 命名空间
    1.  namespace X {}
12. # 高级类型
   1. 交叉类型：多个类型的并集
      1. [A & B & C]
      2. 可以访问 A、B、C接口上任何的属性方法
   2. 联合类型：多个类型的交集
      1. [A | B | C]
      2. 只能访问 A、B、C接口上都有的属性方法
   3. 索引类型
   4. 映射类型
