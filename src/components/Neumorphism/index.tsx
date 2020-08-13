/** @jsx jsx */
// 因为 jsx使用的是 emotion的 jsx，所以 react的 jsx引用无效
// import React from 'react'
import styled from "@emotion/styled";
// import { jsx, css } from "@emotion/core";
import {Button} from 'antd'
// import { ChromeFilled} from '@ant-design/icons'
// $b0: #f0f5ff; $b1: #d6e4ff; $b2: #adc6ff; $b3: #85a5ff; $b4: #597ef7; $b5: #2f54eb; $b6: #1d39c4; $b7: #10239e; $b8: #061178; $b9: #030852;
// $g0: #fafafa; $g1: #f5f5f5; $g2: #f0f0f0; $g3: #d9d9d9; $g4: #bfbfbf; $g5: #8c8c8c; $g6: #595959; $g7: #434343; $g8: #262626; $g9: #1f1f1f; $g10: #141414; 
// $w: #ffffff; 
// $b: #000000;
export const NButton = styled(Button)`
    border: none;
    box-shadow: 1px 1px 3px rgba(62, 157, 245, 0.3), -1px -1px 3px rgba(62, 157, 245, 0.3),
                2px 2px 5px rgba(62, 157, 245, 0.2), -2px -2px 5px rgba(62, 157, 245, 0.2),
                3px 3px 8px rgba(62, 157, 245, 0.1), -3px -3px 8px rgba(62, 157, 245, 0.1);
    &:hover {
        transition: color 0.8s ease-out;
        box-shadow: 1px 1px 3px rgba(62, 157, 245, 0.5) inset, -1px -1px 3px rgba(62, 157, 245, 0.3) inset,
                    2px 2px 5px rgba(62, 157, 245, 0.3) inset, -2px -2px 5px rgba(62, 157, 245, 0.2) inset,
                    3px 3px 8px rgba(62, 157, 245, 0.1) inset, -3px -3px 8px rgba(62, 157, 245, 0.1) inset;
    }
`
