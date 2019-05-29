import React from 'react';

const MemberLevel = props => (
    <main className="col-sm-10 my-2">
        <div className="d-flex flex-column">
            <p className="bg-grass text-white p-3 fs-18">目前分級：露營新手</p>
            <table>
                <thead className="border level_thead">
                    <tr>
                        <th className="text-center py-2">徽章</th>
                        <th className="text-center py-2">會員等級</th>
                        <th className="text-center py-2">完成訂單數</th>
                        <th className="text-center py-2">生日禮</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border">
                        <td className="py-2 d-flex justify-content-center">
                            <div className="level_one bg-ground d-flex align-items-center justify-content-center">
                                <i className="fas fa-campground"></i>
                            </div>
                        </td>
                        <td className="text-center py-2">露營新手</td>
                        <td className="text-center py-2">不限</td>
                        <td className="text-center py-2">50元折價券</td>
                    </tr>
                    <tr className="border">
                        <td className="py-2 d-flex justify-content-center">
                            <div className="level_two bg-forest d-flex align-items-center justify-content-center">
                                <i className="fas fa-tree"></i>
                            </div>
                        </td>
                        <td className="text-center py-2">業餘露營家</td>
                        <td className="text-center py-2">10筆</td>
                        <td className="text-center py-2">100元折價券</td>
                    </tr>
                    <tr className="border">
                        <td className="py-2 d-flex justify-content-center">
                            <div className="level_three bg-sunshine d-flex align-items-center justify-content-center">
                                <i className="fas fa-crown"></i>
                            </div>
                        </td>
                        <td className="text-center py-2">露營達人</td>
                        <td className="text-center py-2">30筆</td>
                        <td className="text-center py-2">500元折價券</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </main>
)

export default MemberLevel