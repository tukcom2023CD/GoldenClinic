//
//  RecommendRegionsViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/06/22.
//

import UIKit

class RecommendRegionsViewController: UIViewController {
    @IBOutlet weak var regionsCollectionView: UICollectionView!
    
    var dataArr =  ["종로구", "중구","용산구","성동구","광진구", "동대문구", "중랑구", "성북구", "강북구",
                    "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구",
                    "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구","송파구", "강동구"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        regionsCollectionView.delegate = self
        regionsCollectionView.dataSource = self
    }
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
            let cell = sender as! UICollectionViewCell
            let indexPath = regionsCollectionView.indexPath(for: cell)
    }
}

extension RecommendRegionsViewController: UICollectionViewDataSource, UICollectionViewDelegate{
    // Cell의 갯수
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return dataArr.count
    }
    
    // cell의 구성
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "recommendRegionsCollectionViewCell", for: indexPath) as! RecommendRegionsCollectionViewCell
        cell.lblRegion.text = dataArr[indexPath.row]
        
        return cell
    }
}

extension RecommendRegionsViewController: UICollectionViewDelegateFlowLayout{
    // 위 아래 간격
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 1
    }
    
    // 좌우 간격
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 1
    }
    
    // cell size
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let width = collectionView.frame.width / 3 - 1
        let size = CGSize(width: width, height: width)
        
        return size
    }
}

