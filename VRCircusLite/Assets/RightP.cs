using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class RightP : MonoBehaviour {

    public Renderer rend;
    public bool isDetected;

    // Use this for initialization
    void Start()
    {
        isDetected = false;
        rend = GetComponent<Renderer>();
    }

    // Update is called once per frame
    void Update()
    {
        if (isDetected == true)
        {
            Color clr = Color.white;
            rend.material.color = clr;
            if (GvrControllerInput.ClickButtonDown)
            {
                //SceneManager.LoadScene("paintToss");
            }
        }
        else
        {
            Color col = new Color(1, 1, 1, 0);
            //rend.material.color = col;
        }
    }
}
