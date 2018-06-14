using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class playerRaycasting : MonoBehaviour {

	public float distanceToSee;
	public LeftP LTrigger;
	public MiddleP MTrigger;
	public RightP RTrigger;
    // Use this for initialization
    void Start () {
		GameObject g = GameObject.FindGameObjectWithTag ("Lpannels");
		GameObject a = GameObject.FindGameObjectWithTag ("Mpannels");
		GameObject b = GameObject.FindGameObjectWithTag ("Rpannels");
		LTrigger = g.GetComponent<LeftP> ();
		MTrigger = a.GetComponent<MiddleP> ();
		RTrigger = b.GetComponent<RightP> ();
	}
	
	// Update is called once per frame
	void Update () {

		Debug.DrawRay (this.transform.position, this.transform.forward * distanceToSee, Color.magenta);

        RaycastHit[] hits;
        hits = Physics.RaycastAll(transform.position, transform.forward, distanceToSee);

        for (int i = 0; i < hits.Length; i++)
        {
            triggerDetect(hits[i]);
        }

	}

    private void triggerDetect(RaycastHit chosenObject)
    {

        if (chosenObject.collider.tag == "Rpannels")
        {
            
        }

        if (chosenObject.collider.tag == "Lpannels" || chosenObject.collider.tag == "Mpannels" || chosenObject.collider.tag == "Rpannels")
        {
            if (chosenObject.collider.gameObject.GetComponent<KeyPannels>().whatKeyAmI == KeyPannels.Keypannels.leftPannel)
            {
                LTrigger.isDetected = true;
            }
            else
            {
                LTrigger.isDetected = false;
            }
            if (chosenObject.collider.gameObject.GetComponent<KeyPannels>().whatKeyAmI == KeyPannels.Keypannels.middlePannel)
            {
                MTrigger.isDetected = true;
            }
            else
            {
                MTrigger.isDetected = false;
            }
            if (chosenObject.collider.gameObject.GetComponent<KeyPannels>().whatKeyAmI == KeyPannels.Keypannels.rightPannel)
            {
                RTrigger.isDetected = true;
            }
            else
            {
                RTrigger.isDetected = false;
            }
        }
        else
        {
            LTrigger.isDetected = false;
            MTrigger.isDetected = false;
            RTrigger.isDetected = false;
        }
    }

}
