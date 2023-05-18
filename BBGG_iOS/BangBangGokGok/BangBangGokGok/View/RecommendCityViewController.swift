//
//  RecommendCityTableViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/04/27.
//

import UIKit

class RecommendCityViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    
    var dataArr =  ["banner0.png", "banner1.png","banner2.png","banner3.png","banner4.png", "banner5.png", "banner6.png"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        collectionView.delegate = self
        collectionView.dataSource = self
    }
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
            let cell = sender as! UICollectionViewCell
            let indexPath = collectionView.indexPath(for: cell)
    }
}

extension RecommendCityViewController: UICollectionViewDataSource, UICollectionViewDelegate{
    // Cell의 갯수
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return dataArr.count
    }
    
    // cell의 구성
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "recommendCityCell", for: indexPath) as! RecommendCityCell
        cell.imgButton.image = UIImage(named: dataArr[indexPath.row])
        
        return cell
    }
}

extension RecommendCityViewController: UICollectionViewDelegateFlowLayout{
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

